import type { Metadata } from 'next';
import EnrollForm from './EnrollForm';
import { CheckCircle2, GraduationCap, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Enroll in an Online Degree',
  description: 'Enroll in BA, BCA, MCA, or MBA online degree programmes from Mangalayatan University through SRS Digital Library, Barsethi Jaunpur. NAAC A+ accredited.',
};

const programmes = ['BA (Online)', 'BCA (Online)', 'MCA (Online)', 'MBA - Marketing (Online)'];

const benefits = [
  'Government-recognized degree valid across India',
  'No need to travel to the city or shift from home',
  'Affordable fees — study while you work or prepare for exams',
  'Expert academic counselling at our library',
  'Full support through the enrollment and study process',
  "Access to Mangalayatan University's online LMS portal",
];

export default function EnrollPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0B3D91] to-[#1a52b5] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-5 text-sm">
            <Star className="w-4 h-4 text-[#F97316] fill-[#F97316]" />
            <span className="text-blue-100">Mangalayatan University · NAAC A+ · Govt. Recognized</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Enroll in an Online Degree</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Fill in the form and we'll contact you to guide you through programme selection and enrollment — completely free counselling.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <EnrollForm programmes={programmes} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-[#0B3D91]/10 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-[#0B3D91]" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">Why Enroll Through Us?</h2>
                    <p className="text-xs text-gray-500">Authorized Academic Counselling Centre</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {benefits.map(b => (
                    <div key={b} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#F97316] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Programmes available */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h2 className="font-bold text-gray-900 mb-4">Available Programmes</h2>
                <div className="space-y-2">
                  {[
                    { name: 'BA (Online)', level: 'UG', color: 'bg-blue-50 text-blue-800 border-blue-200' },
                    { name: 'BCA (Online)', level: 'UG · Lateral Entry', color: 'bg-blue-50 text-blue-800 border-blue-200' },
                    { name: 'MCA (Online)', level: 'PG', color: 'bg-orange-50 text-orange-800 border-orange-200' },
                    { name: 'MBA — Marketing (Online)', level: 'PG', color: 'bg-orange-50 text-orange-800 border-orange-200' },
                  ].map(prog => (
                    <div key={prog.name} className={`flex items-center justify-between rounded-xl px-4 py-3 border text-sm ${prog.color}`}>
                      <span className="font-semibold">{prog.name}</span>
                      <span className="text-xs">{prog.level}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust note */}
              <div className="bg-[#0B3D91] rounded-2xl p-5 text-white">
                <div className="text-sm font-semibold text-[#F97316] mb-1">Official Authorization</div>
                <p className="text-blue-200 text-xs leading-relaxed">
                  SRS Digital Library is an officially appointed Academic Counsellor for Mangalayatan University, Aligarh.
                  Ref: MU/ALI//2026-27/254, dated 21-05-2026. Our counselling is free and without any obligation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
