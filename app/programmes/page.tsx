import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, GraduationCap, Star, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Online Degree Programmes',
  description: 'Enroll in BA, BCA, MCA, MBA online degree programmes from Mangalayatan University (NAAC A+) through SRS Digital Library, Barsethi Jaunpur. No need to travel to a city.',
};

const programmes = [
  {
    id: 'BA',
    name: 'BA (Online)',
    fullName: 'Bachelor of Arts — Online',
    level: 'Undergraduate (UG)',
    duration: '[Contact us for duration details]',
    eligibility: '[Contact us for eligibility criteria]',
    fees: 'Contact us for fee structure',
    tagline: 'Build your foundation in arts, language, and social sciences.',
    whoFor: 'Ideal for students after Class 12 who want a flexible, affordable degree while managing family, work, or other responsibilities.',
    highlights: [
      { label: 'Critical Thinking', desc: 'Develop logical reasoning and analytical skills valued by employers' },
      { label: 'Communication Skills', desc: 'Improve verbal and written communication in multiple contexts' },
      { label: 'Problem-Solving', desc: 'Learn frameworks to tackle real-world challenges systematically' },
    ],
    keyFeatures: [
      'Fully online — study from home or our library',
      'Government-recognized degree, valid for jobs & further studies',
      'LMS access for lectures, notes, and assignments',
      'Affordable fee structure — no city living costs',
    ],
    badgeColor: 'bg-blue-100 text-blue-800',
    accentColor: '#0B3D91',
  },
  {
    id: 'BCA',
    name: 'BCA (Online)',
    fullName: 'Bachelor of Computer Applications — Online',
    level: 'Undergraduate (UG)',
    duration: '[Contact us for duration details]',
    eligibility: '[Contact us for eligibility criteria]',
    fees: 'Contact us for fee structure',
    tagline: 'Launch your IT career with an industry-relevant computer applications degree.',
    whoFor: 'Perfect for students after Class 12 (PCM/any stream) who want a career in software, IT support, or data. Lateral entry option available for diploma holders.',
    lateralEntry: true,
    highlights: [
      { label: 'IT-Relevant Curriculum', desc: 'Programming, databases, networking, and web development' },
      { label: 'LMS Access', desc: 'Learn at your own pace with video lectures and digital resources' },
      { label: 'Job-Ready Skills', desc: 'Industry-aligned curriculum designed with employer needs in mind' },
    ],
    keyFeatures: [
      'Lateral entry available for diploma holders',
      'Covers programming, DBMS, web, networking, and more',
      'Government-recognized degree — valid across India',
      'Online examination and support',
    ],
    badgeColor: 'bg-blue-100 text-blue-800',
    accentColor: '#0B3D91',
  },
  {
    id: 'MCA',
    name: 'MCA (Online)',
    fullName: 'Master of Computer Applications — Online',
    level: 'Postgraduate (PG)',
    duration: '[Contact us for duration details]',
    eligibility: '[Contact us for eligibility criteria]',
    fees: 'Contact us for fee structure',
    tagline: 'Advance your IT career with one of the most in-demand postgraduate degrees.',
    whoFor: 'Ideal for BCA, BSc IT, or BSc Computer Science graduates seeking a master\'s degree to boost career prospects in software development, data science, or IT management.',
    highlights: [
      { label: 'In-Demand IT Skills', desc: 'Advanced programming, AI/ML fundamentals, cloud, and system design' },
      { label: 'Interpersonal Development', desc: 'Leadership, teamwork, and professional communication skills' },
      { label: 'Internship Included', desc: 'Real industry experience as part of the programme' },
    ],
    keyFeatures: [
      'Internship opportunity included in programme',
      'Covers advanced IT concepts for career advancement',
      'Recognized by UGC and DEB',
      'Enrollment deadlines extended periodically — contact us',
    ],
    note: 'Enrollment deadlines may be extended. Contact us to check the latest enrollment window.',
    badgeColor: 'bg-orange-100 text-orange-800',
    accentColor: '#F97316',
  },
  {
    id: 'MBA',
    name: 'MBA — Marketing (Online)',
    fullName: 'Master of Business Administration — Marketing Online',
    level: 'Postgraduate (PG)',
    duration: '[Contact us for duration details]',
    eligibility: '[Contact us for eligibility criteria]',
    fees: 'Contact us for fee structure',
    tagline: '"Job · Study · Perform" — Excel in the dynamic world of business and marketing.',
    whoFor: 'Designed for graduates or working professionals who want to upskill in marketing, management, and business strategy without leaving their job or hometown.',
    highlights: [
      { label: 'Affordable Fees', desc: 'Quality MBA at a fraction of the cost of a regular campus programme' },
      { label: 'E-Learning Platform', desc: 'Access video lectures, case studies, and assignments online anytime' },
      { label: 'Job-Ready Programme', desc: 'Business strategy, digital marketing, consumer behaviour, and more' },
    ],
    keyFeatures: [
      '"Job · Study · Perform" — designed for working professionals',
      'Marketing specialization with practical case studies',
      'Recognized MBA degree valid for corporate roles',
      'Flexible learning — no need to leave your job',
    ],
    badgeColor: 'bg-orange-100 text-orange-800',
    accentColor: '#F97316',
  },
];

export default function ProgrammesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0B3D91] to-[#1a52b5] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-5 text-sm">
            <Star className="w-4 h-4 text-[#F97316] fill-[#F97316]" />
            <span className="text-blue-100">Mangalayatan University · NAAC A+ Accredited · Govt. Recognized</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Online Degree Programmes</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed">
            Earn a Bachelor's or Master's degree from a government-recognized, NAAC A+ university —
            without leaving Jaunpur. Enroll through SRS Digital Library.
          </p>
        </div>
      </section>

      {/* Accreditation notice */}
      <section className="py-8 bg-amber-50 border-b border-amber-200">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <GraduationCap className="w-8 h-8 text-[#F97316] flex-shrink-0" />
          <p className="text-amber-900 text-sm leading-relaxed">
            <strong>Government Recognized & Valid:</strong> All programmes are offered by Mangalayatan University, Aligarh — recognized by the UGC and approved by DEB (Distance Education Bureau).
            Degrees are valid for employment and higher education across India.
            SRS Digital Library is an officially appointed Academic Counsellor (Ref: MU/ALI//2026-27/254).
          </p>
        </div>
      </section>

      {/* Programme sections */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {programmes.map((prog, idx) => (
            <div
              key={prog.id}
              id={prog.id.toLowerCase()}
              className={`grid lg:grid-cols-2 gap-10 items-start ${idx % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
            >
              {/* Left: Details */}
              <div className={idx % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${prog.badgeColor}`}>
                    {prog.level}
                  </span>
                  {prog.lateralEntry && (
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-100 text-green-800">
                      Lateral Entry Available
                    </span>
                  )}
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-1">{prog.name}</h2>
                <p className="text-gray-500 text-sm mb-4">{prog.fullName}</p>
                <p className="text-gray-700 italic text-base mb-4 border-l-4 border-[#F97316] pl-4">{prog.tagline}</p>

                <p className="text-gray-700 mb-6 leading-relaxed">{prog.whoFor}</p>

                {prog.note && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5 text-amber-900 text-sm">
                    <strong>Note:</strong> {prog.note}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 text-sm mb-6">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="text-gray-500 text-xs mb-0.5">Duration</div>
                    <div className="font-semibold text-gray-900">{prog.duration}</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="text-gray-500 text-xs mb-0.5">Fee Structure</div>
                    <div className="font-semibold text-[#0B3D91]">{prog.fees}</div>
                  </div>
                </div>

                <Link
                  href={`/enroll?programme=${prog.id}`}
                  className="btn-primary w-full sm:w-auto"
                  style={{ background: prog.accentColor }}
                >
                  Enroll in {prog.name} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Right: Highlights + Key Features */}
              <div className={`space-y-4 ${idx % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <h3 className="font-bold text-gray-900 text-lg mb-4">Key Highlights</h3>
                  <div className="space-y-4">
                    {prog.highlights.map(h => (
                      <div key={h.label} className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#F97316] flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">{h.label}</div>
                          <div className="text-gray-600 text-sm">{h.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#0B3D91]/5 rounded-2xl p-6 border border-[#0B3D91]/10">
                  <h3 className="font-bold text-gray-900 text-lg mb-4">What You Get</h3>
                  <ul className="space-y-2">
                    {prog.keyFeatures.map(f => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] flex-shrink-0 mt-2" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-xs text-gray-500 bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <strong>Eligibility:</strong> {prog.eligibility}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* University details */}
      <section className="py-14 bg-[#0B3D91]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-8">
            <h2 className="text-2xl font-bold mb-2">About Mangalayatan University</h2>
            <p className="text-blue-200">Your degree comes from a trusted, accredited institution.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {[
              { label: 'Accreditation', value: 'NAAC A+ Grade' },
              { label: 'Status', value: 'Govt. Recognized University' },
              { label: 'Online Platform', value: <a href='www.muonline.ac.in'>www.muonline.ac.in</a> },
              { label: 'University Contact', value: '+91 8393879627' },
            ].map(item => (
              <div key={item.label} className="bg-white/10 border border-white/20 rounded-xl p-4">
                <div className="text-blue-200 text-xs mb-1">{item.label}</div>
                <div className="text-white font-semibold">{item.value}</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a
              href="https://www.mangalayatan.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-200 hover:text-white text-sm transition-colors"
            >
              Visit University Website <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Enroll?</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Don't let distance or cost stop your education. We're right here in Barsethi, Jaunpur — come visit or fill in the form and we'll call you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/enroll" className="btn-primary py-4 px-8">
              Apply for a Programme <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:9415660616" className="btn-secondary py-4 px-8">
              Call Us First
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
