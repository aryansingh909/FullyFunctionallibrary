'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { generalContactSchema, GeneralContactInput } from '@/lib/validation';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<GeneralContactInput>({
    resolver: zodResolver(generalContactSchema),
  });

  const onSubmit = async (data: GeneralContactInput) => {
    setServerError('');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'general', ...data }),
      });
      if (!res.ok) {
        const body = await res.json();
        setServerError(body.error ?? 'Something went wrong. Please try again.');
        return;
      }
      setSubmitted(true);
    } catch {
      setServerError('Network error. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-center h-full flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h2>
        <p className="text-gray-600">We'll get back to you soon. Or call us directly at <a href="tel:9415660616" className="text-[#0B3D91] font-semibold">94156 60616</a>.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Send a Message</h2>

      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-3 mb-5 text-sm">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <input type="text" {...register('website')} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name" type="text" {...register('name')}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] outline-none transition-colors"
            placeholder="Full name"
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
            placeholder="10-digit mobile number" maxLength={10}
          />
          {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message" {...register('message')} rows={5}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] outline-none transition-colors resize-none"
            placeholder="How can we help you?"
          />
          {errors.message && <p className="text-red-600 text-xs mt-1">{errors.message.message}</p>}
        </div>

        <button
          type="submit" disabled={isSubmitting}
          className="w-full bg-[#0B3D91] text-white font-semibold rounded-xl py-4 hover:bg-blue-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
