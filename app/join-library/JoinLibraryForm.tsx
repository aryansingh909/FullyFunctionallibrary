'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { libraryInquirySchema, LibraryInquiryInput } from '@/lib/validation';
import { LibraryPlan } from '@/lib/types';

interface Props {
  plans: LibraryPlan[];
}

export default function JoinLibraryForm({ plans }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LibraryInquiryInput>({
    resolver: zodResolver(libraryInquirySchema),
  });

  const onSubmit = async (data: LibraryInquiryInput) => {
    setServerError('');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'library', ...data }),
      });
      if (!res.ok) {
        const body = await res.json();
        setServerError(body.error ?? 'Something went wrong. Please try again.');
        return;
      }
      setSubmitted(true);
    } catch {
      setServerError('Network error. Please check your connection and try again.');
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Received!</h2>
        <p className="text-gray-600 mb-2">
          Thank you! We'll call you within 24 hours to confirm your seat and answer any questions.
        </p>
        <p className="text-sm text-gray-500">Or call us directly: <a href="tel:9415660616" className="text-[#0B3D91] font-semibold">94156 60616</a></p>
      </div>
    );
  }

  const planOptions = plans.length > 0
    ? plans.map(p => p.name)
    : ['Daily', 'Monthly', 'Quarterly', 'Yearly'];

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Reserve Your Seat</h2>

      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-3 mb-5 text-sm">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Honeypot — hidden from real users */}
        <input type="text" {...register('website')} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] outline-none transition-colors placeholder:text-gray-400"
            placeholder="Enter your full name"
            autoComplete="name"
          />
          {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            {...register('phone')}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] outline-none transition-colors placeholder:text-gray-400"
            placeholder="10-digit mobile number"
            autoComplete="tel"
            maxLength={10}
          />
          {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Email <span className="text-gray-400 text-xs font-normal">(optional)</span>
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] outline-none transition-colors placeholder:text-gray-400"
            placeholder="your@email.com"
            autoComplete="email"
          />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Village / City / Address <span className="text-gray-400 text-xs font-normal">(optional)</span>
          </label>
          <input
            id="address"
            type="text"
            {...register('address')}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] outline-none transition-colors placeholder:text-gray-400"
            placeholder="Your village, city or locality"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="plan" className="block text-sm font-semibold text-gray-700 mb-1.5">
              Preferred Plan
            </label>
            <select
              id="plan"
              {...register('plan')}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] outline-none transition-colors bg-white"
            >
              <option value="">Select a plan</option>
              {planOptions.map(p => <option key={p} value={p}>{p}</option>)}
              <option value="Not sure yet">Not sure yet</option>
            </select>
          </div>

          <div>
            <label htmlFor="preferred_timing" className="block text-sm font-semibold text-gray-700 mb-1.5">
              Preferred Timing
            </label>
            <select
              id="preferred_timing"
              {...register('preferred_timing')}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] outline-none transition-colors bg-white"
            >
              <option value="">Select timing</option>
              <option value="Morning">Morning</option>
              {/* <option value="Afternoon">Afternoon</option> */}
              <option value="Evening">Evening</option>
              <option value="Full Day">Full Day</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Any Questions? <span className="text-gray-400 text-xs font-normal">(optional)</span>
          </label>
          <textarea
            id="message"
            {...register('message')}
            rows={3}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] outline-none transition-colors placeholder:text-gray-400 resize-none"
            placeholder="Any specific questions or requirements..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#0B3D91] text-white font-semibold rounded-xl py-4 hover:bg-blue-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
          ) : (
            'Reserve My Seat'
          )}
        </button>

        <p className="text-xs text-gray-500 text-center">
          We'll call you within 24 hours. Your information is kept private and never shared.
        </p>
      </form>
    </div>
  );
}
