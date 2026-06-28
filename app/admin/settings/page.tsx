'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowLeft, Save, Loader2, Eye, EyeOff, CheckCircle2,
  Clock, CreditCard, Key, Plus, Trash2, BookOpen
} from 'lucide-react';
import { changePasswordSchema, ChangePasswordInput } from '@/lib/validation';
import { LibraryTiming, LibraryPlan } from '@/lib/types';

function Section({ title, icon: Icon, children }: { title: string; icon: typeof Clock; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50">
        <div className="w-8 h-8 bg-[#0B3D91]/10 rounded-lg flex items-center justify-center">
          <Icon className="w-4 h-4 text-[#0B3D91]" />
        </div>
        <h2 className="font-bold text-gray-900">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

export default function AdminSettingsPage() {
  const router = useRouter();

  // Timings
  const [timings, setTimings] = useState<LibraryTiming>({
    weekdays: { open: '7:00 AM', close: '9:00 PM', label: 'Monday – Saturday' },
    sunday: { open: '8:00 AM', close: '8:00 PM', label: 'Sunday' },
    note: 'Open all days including public holidays. Timings may vary — call to confirm.',
  });
  const [timingsSaved, setTimingsSaved] = useState(false);
  const [timingsSaving, setTimingsSaving] = useState(false);

  // Plans
  const [plans, setPlans] = useState<LibraryPlan[]>([]);
  const [plansSaved, setPlansSaved] = useState(false);
  const [plansSaving, setPlansSaving] = useState(false);

  // Password
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwError, setPwError] = useState('');

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/admin/settings');
        if (res.status === 401) { router.push('/admin/login'); return; }
        const data = await res.json();
        if (data.success) {
          if (data.data.library_timings) setTimings(data.data.library_timings as LibraryTiming);
          if (data.data.library_plans) setPlans(data.data.library_plans as LibraryPlan[]);
        }
      } catch { /* silent */ }
    })();
  }, [router]);

  const saveTimings = async () => {
    setTimingsSaving(true);
    const res = await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'library_timings', value: timings }),
    });
    setTimingsSaving(false);
    if (res.ok) { setTimingsSaved(true); setTimeout(() => setTimingsSaved(false), 3000); }
  };

  const savePlans = async () => {
    setPlansSaving(true);
    const res = await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'library_plans', value: plans }),
    });
    setPlansSaving(false);
    if (res.ok) { setPlansSaved(true); setTimeout(() => setPlansSaved(false), 3000); }
  };

  const addPlan = () => {
    setPlans(p => [...p, {
      id: `plan-${Date.now()}`,
      name: 'New Plan',
      price: 'Contact for pricing',
      description: '',
      features: [''],
    }]);
  };

  const removePlan = (idx: number) => setPlans(p => p.filter((_, i) => i !== idx));

  const updatePlan = (idx: number, field: keyof LibraryPlan, value: string | string[]) => {
    setPlans(p => p.map((plan, i) => i === idx ? { ...plan, [field]: value } : plan));
  };

  const updatePlanFeature = (planIdx: number, featIdx: number, value: string) => {
    setPlans(p => p.map((plan, i) => {
      if (i !== planIdx) return plan;
      const features = [...plan.features];
      features[featIdx] = value;
      return { ...plan, features };
    }));
  };

  const addFeature = (planIdx: number) => {
    setPlans(p => p.map((plan, i) => i === planIdx ? { ...plan, features: [...plan.features, ''] } : plan));
  };

  const removeFeature = (planIdx: number, featIdx: number) => {
    setPlans(p => p.map((plan, i) =>
      i !== planIdx ? plan : { ...plan, features: plan.features.filter((_, fi) => fi !== featIdx) }
    ));
  };

  const onPasswordSubmit = async (data: ChangePasswordInput) => {
    setPwError('');
    const res = await fetch('/api/admin/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const body = await res.json();
    if (!res.ok) { setPwError(body.error ?? 'Failed to change password.'); return; }
    setPwSuccess(true);
    reset();
    setTimeout(() => { router.push('/admin/login'); }, 2000);
  };

  const inputClass = 'w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] outline-none transition-colors text-sm';
  const labelClass = 'block text-xs font-semibold text-gray-600 mb-1';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#0B3D91] text-white px-4 sm:px-6 py-4 flex items-center gap-4 shadow-lg">
        <button onClick={() => router.push('/admin/dashboard')} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#F97316] rounded-lg flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-bold text-sm sm:text-base">Admin Settings</div>
            <div className="text-blue-200 text-xs">SRS Digital Library</div>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* ── LIBRARY TIMINGS ── */}
        <Section title="Library Timings" icon={Clock}>
          <div className="space-y-4">
            <div>
              <div className="font-semibold text-gray-900 text-sm mb-3">Monday – Saturday</div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className={labelClass}>Label</label>
                  <input
                    value={timings.weekdays.label}
                    onChange={e => setTimings(t => ({ ...t, weekdays: { ...t.weekdays, label: e.target.value } }))}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Opens</label>
                  <input
                    value={timings.weekdays.open}
                    onChange={e => setTimings(t => ({ ...t, weekdays: { ...t.weekdays, open: e.target.value } }))}
                    className={inputClass}
                    placeholder="e.g. 6:00 AM"
                  />
                </div>
                <div>
                  <label className={labelClass}>Closes</label>
                  <input
                    value={timings.weekdays.close}
                    onChange={e => setTimings(t => ({ ...t, weekdays: { ...t.weekdays, close: e.target.value } }))}
                    className={inputClass}
                    placeholder="e.g. 10:00 PM"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="font-semibold text-gray-900 text-sm mb-3">Sunday</div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className={labelClass}>Label</label>
                  <input
                    value={timings.sunday.label}
                    onChange={e => setTimings(t => ({ ...t, sunday: { ...t.sunday, label: e.target.value } }))}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Opens</label>
                  <input
                    value={timings.sunday.open}
                    onChange={e => setTimings(t => ({ ...t, sunday: { ...t.sunday, open: e.target.value } }))}
                    className={inputClass}
                    placeholder="e.g. 8:00 AM"
                  />
                </div>
                <div>
                  <label className={labelClass}>Closes</label>
                  <input
                    value={timings.sunday.close}
                    onChange={e => setTimings(t => ({ ...t, sunday: { ...t.sunday, close: e.target.value } }))}
                    className={inputClass}
                    placeholder="e.g. 8:00 PM"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className={labelClass}>Note (shown publicly)</label>
              <textarea
                value={timings.note}
                onChange={e => setTimings(t => ({ ...t, note: e.target.value }))}
                rows={2}
                className={`${inputClass} resize-none`}
                placeholder="e.g. Open all days including public holidays..."
              />
            </div>

            <button
              onClick={saveTimings}
              disabled={timingsSaving}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#0B3D91] text-white rounded-xl text-sm font-semibold hover:bg-blue-800 transition-colors disabled:opacity-60"
            >
              {timingsSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : timingsSaved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {timingsSaved ? 'Saved!' : 'Save Timings'}
            </button>
          </div>
        </Section>

        {/* ── LIBRARY PLANS ── */}
        <Section title="Library Plans & Pricing" icon={CreditCard}>
          <div className="space-y-5">
            {plans.map((plan, idx) => (
              <div key={plan.id} className="border border-gray-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-gray-700">Plan {idx + 1}</span>
                  <button
                    onClick={() => removePlan(idx)}
                    className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Plan Name</label>
                    <input
                      value={plan.name}
                      onChange={e => updatePlan(idx, 'name', e.target.value)}
                      className={inputClass}
                      placeholder="e.g. Monthly Plan"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Price</label>
                    <input
                      value={plan.price}
                      onChange={e => updatePlan(idx, 'price', e.target.value)}
                      className={inputClass}
                      placeholder="e.g. ₹500/month"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className={labelClass}>Description</label>
                    <input
                      value={plan.description}
                      onChange={e => updatePlan(idx, 'description', e.target.value)}
                      className={inputClass}
                      placeholder="Short description of this plan"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Features</label>
                  <div className="space-y-2">
                    {plan.features.map((feat, fi) => (
                      <div key={fi} className="flex gap-2">
                        <input
                          value={feat}
                          onChange={e => updatePlanFeature(idx, fi, e.target.value)}
                          className={`${inputClass} flex-1`}
                          placeholder="e.g. Free WiFi included"
                        />
                        <button
                          onClick={() => removeFeature(idx, fi)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addFeature(idx)}
                      className="flex items-center gap-1 text-xs text-[#0B3D91] hover:text-blue-700 transition-colors"
                    >
                      <Plus className="w-3 h-3" /> Add feature
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={addPlan}
              className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-300 rounded-xl text-sm text-gray-600 hover:border-[#0B3D91] hover:text-[#0B3D91] transition-colors w-full justify-center"
            >
              <Plus className="w-4 h-4" /> Add New Plan
            </button>

            <button
              onClick={savePlans}
              disabled={plansSaving}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#0B3D91] text-white rounded-xl text-sm font-semibold hover:bg-blue-800 transition-colors disabled:opacity-60"
            >
              {plansSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : plansSaved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {plansSaved ? 'Saved!' : 'Save Plans'}
            </button>
          </div>
        </Section>

        {/* ── CHANGE PASSWORD ── */}
        <Section title="Change Admin Password" icon={Key}>
          {pwSuccess ? (
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4 text-green-800">
              <CheckCircle2 className="w-5 h-5" />
              <div>
                <div className="font-semibold">Password changed successfully!</div>
                <div className="text-sm">You will be redirected to login...</div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onPasswordSubmit)} className="space-y-4" noValidate>
              {pwError && (
                <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-3 text-sm">
                  {pwError}
                </div>
              )}

              {[
                { id: 'currentPassword', label: 'Current Password', show: showCurrent, toggle: () => setShowCurrent(v => !v) },
                { id: 'newPassword', label: 'New Password', show: showNew, toggle: () => setShowNew(v => !v) },
                { id: 'confirmPassword', label: 'Confirm New Password', show: showConfirm, toggle: () => setShowConfirm(v => !v) },
              ].map(field => (
                <div key={field.id}>
                  <label htmlFor={field.id} className={labelClass}>{field.label}</label>
                  <div className="relative">
                    <input
                      id={field.id}
                      type={field.show ? 'text' : 'password'}
                      {...register(field.id as keyof ChangePasswordInput)}
                      className={`${inputClass} pr-10`}
                      autoComplete={field.id === 'currentPassword' ? 'current-password' : 'new-password'}
                    />
                    <button
                      type="button"
                      onClick={field.toggle}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label={field.show ? 'Hide password' : 'Show password'}
                    >
                      {field.show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors[field.id as keyof ChangePasswordInput] && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors[field.id as keyof ChangePasswordInput]?.message}
                    </p>
                  )}
                </div>
              ))}

              <p className="text-xs text-gray-500">
                Minimum 8 characters, at least one number. You'll be logged out after changing your password.
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#0B3D91] text-white rounded-xl text-sm font-semibold hover:bg-blue-800 transition-colors disabled:opacity-60"
              >
                {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Changing...</> : <><Key className="w-4 h-4" /> Change Password</>}
              </button>
            </form>
          )}
        </Section>

      </div>
    </div>
  );
}
