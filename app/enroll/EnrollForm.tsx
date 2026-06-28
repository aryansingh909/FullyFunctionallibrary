'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { enrollmentInquirySchema, EnrollmentInquiryInput } from '@/lib/validation';

interface Props {
  programmes: string[];
}

const programmeMap: Record<string, string> = {
  BA: 'BA (Online)',
  BCA: 'BCA (Online)',
  MCA: 'MCA (Online)',
  MBA: 'MBA - Marketing (Online)',
};

export default function EnrollForm({ programmes }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');
  const searchParams = useSearchParams();

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<EnrollmentInquiryInput>({
    resolver: zodResolver(enrollmentInquirySchema),
  });

  useEffect(() => {
    const param = searchParams.get('programme');
    if (param && programmeMap[param]) {
      setValue('programme', programmeMap[param]);
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data: EnrollmentInquiryInput) => {
    setServerError('');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'enrollment', ...data }),
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Received!</h2>
        <p className="text-gray-600 mb-2">
          Thank you! Our academic counsellor will call you within 24 hours to guide you through the next steps.
        </p>
        <p className="text-sm text-gray-500">Or call us directly: <a href="tel:9415660616" className="text-[#0B3D91] font-semibold">94156 60616</a></p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Apply for a Programme</h2>

      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-3 mb-5 text-sm">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <input type="text" {...register('website')} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name" type="text" {...register('name')}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] outline-none transition-colors"
            placeholder="Enter your full name" autoComplete="name"
          />
          {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="phone" type="tel" {...register('phone')}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] outline-none transition-colors"
            placeholder="10-digit mobile number" autoComplete="tel" maxLength={10}
          />
          {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Email <span className="text-gray-400 text-xs font-normal">(optional)</span>
          </label>
          <input
            id="email" type="email" {...register('email')}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] outline-none transition-colors"
            placeholder="your@email.com" autoComplete="email"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="highest_qualification" className="block text-sm font-semibold text-gray-700 mb-1.5">
              Highest Qualification
            </label>
            <select
              id="highest_qualification" {...register('highest_qualification')}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] outline-none transition-colors bg-white"
            >
              <option value="">Select qualification</option>
              <option value="10th">10th Pass</option>
              <option value="12th">12th Pass</option>
              <option value="Graduate">Graduate</option>
              <option value="Postgraduate">Postgraduate</option>
              <option value="Diploma">Diploma</option>
            </select>
          </div>

          <div>
            <label htmlFor="programme" className="block text-sm font-semibold text-gray-700 mb-1.5">
              Programme Interested In
            </label>
            <select
              id="programme" {...register('programme')}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] outline-none transition-colors bg-white"
            >
              <option value="">Select programme</option>
              {programmes.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="specialization" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Specialization <span className="text-gray-400 text-xs font-normal">(optional — e.g. Marketing for MBA)</span>
          </label>
          <input
            id="specialization" type="text" {...register('specialization')}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] outline-none transition-colors"
            placeholder="e.g. Marketing, Finance, HR..."
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-1.5">
              City / Village
            </label>
            <input
              id="address" type="text" {...register('address')}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] outline-none transition-colors"
              placeholder="Your city or village"
            />
          </div>

          <div>
            <label htmlFor="preferred_callback" className="block text-sm font-semibold text-gray-700 mb-1.5">
              Best Time to Call
            </label>
            <select
              id="preferred_callback" {...register('preferred_callback')}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] outline-none transition-colors bg-white"
            >
              <option value="">Anytime</option>
              <option value="Morning (8am-12pm)">Morning (8am–12pm)</option>
              <option value="Afternoon (12pm-4pm)">Afternoon (12pm–4pm)</option>
              <option value="Evening (4pm-8pm)">Evening (4pm–8pm)</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Questions / Message <span className="text-gray-400 text-xs font-normal">(optional)</span>
          </label>
          <textarea
            id="message" {...register('message')} rows={3}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] outline-none transition-colors resize-none"
            placeholder="Any questions about the programme, fees, or admission process..."
          />
        </div>

        <button
          type="submit" disabled={isSubmitting}
          className="w-full bg-[#F97316] text-white font-semibold rounded-xl py-4 hover:bg-orange-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : 'Submit Application'}
        </button>

        <p className="text-xs text-gray-500 text-center">
          Free counselling — no obligation. We'll guide you through the process step by step.
        </p>
      </form>
    </div>
  );
}
