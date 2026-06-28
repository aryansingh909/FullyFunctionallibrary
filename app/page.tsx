import Link from 'next/link';
import Image from 'next/image';
import {
  Wind, Wifi, Zap, ShieldCheck, Car, Bath,
  GraduationCap, Star, ArrowRight, Phone, MapPin, CheckCircle2,
  ChevronRight, Users, BookOpen
} from 'lucide-react';

const facilities = [
  { icon: Wind, label: 'Air-Conditioned Hall', desc: 'Study in cool, comfortable environment all day long' },
  { icon: Wifi, label: 'Free WiFi', desc: 'High-speed internet for research and online learning' },
  { icon: Zap, label: '24x7 Power Backup', desc: 'Never lose study time during power cuts' },
  { icon: ShieldCheck, label: 'CCTV Surveillance', desc: 'Secure premises monitored round the clock' },
  { icon: Car, label: 'Parking Available', desc: 'Convenient parking for two-wheelers and vehicles' },
  { icon: Bath, label: 'Clean Washroom', desc: 'Well-maintained, hygienic washroom facilities' },
];

const programmes = [
  {
    name: 'BA (Online)',
    level: 'Undergraduate',
    highlights: ['Critical Thinking', 'Communication Skills', 'Problem-Solving'],
    badge: 'UG',
    color: 'blue',
    slug: 'BA',
  },
  {
    name: 'BCA (Online)',
    level: 'Undergraduate · Lateral Entry Available',
    highlights: ['IT-Relevant Curriculum', 'LMS Access', 'Job-Ready Skills'],
    badge: 'UG',
    color: 'blue',
    slug: 'BCA',
  },
  {
    name: 'MCA (Online)',
    level: 'Postgraduate',
    highlights: ['In-Demand IT Skills', 'Interpersonal Development', 'Internship Included'],
    badge: 'PG',
    color: 'orange',
    slug: 'MCA',
  },
  {
    name: 'MBA — Marketing',
    level: 'Postgraduate',
    highlights: ['Affordable Fees', 'E-Learning Platform', 'Job-Ready Programme'],
    badge: 'PG',
    color: 'orange',
    slug: 'MBA',
  },
];

const steps = [
  { n: '01', title: 'Enquire', desc: 'Fill in a quick form or call us. Tell us your qualification and the programme you\'re interested in.' },
  { n: '02', title: 'Counselling Call', desc: 'We contact you, answer every question, and help you choose the right programme for your career goals.' },
  { n: '03', title: 'Enroll Online', desc: 'Complete enrollment from our library — no city travel needed. Study right here at your convenience.' },
];

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#0B3D91] via-[#1a52b5] to-[#0B3D91] text-white overflow-hidden min-h-[88vh] flex items-center">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, #fff 1px, transparent 1px), radial-gradient(circle at 75% 75%, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F97316]/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Trust badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 text-sm">
                <Star className="w-4 h-4 text-[#F97316] fill-[#F97316]" />
                <span className="text-blue-100 font-medium">Authorized Mangalayatan University Centre · NAAC A+</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-balance leading-[1.1]">
                Your Local Library,{' '}
                <span className="text-[#F97316]">Your Path</span>{' '}
                to a University Degree
              </h1>

              {/* Hindi tagline */}
              <div className="bg-white/10 border border-white/20 rounded-xl p-4 mb-6">
                <p className="text-xl text-white font-semibold mb-1">
                  "अब शहर जाकर ज़्यादा खर्चा उठाने की ज़रूरत नहीं है।"
                </p>
                <p className="text-blue-200 text-sm italic">
                  "No need to go to the city and spend a lot of money anymore. Study right here, at your own convenience, and earn your Bachelor's and Master's degree."
                </p>
              </div>

              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                AC reading Room · Free WiFi · 24x7 power backup · Barsethi, Jaunpur.
                We're also an officially appointed counselling centre for online degrees from Mangalayatan University.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/join-library" className="btn-primary text-base py-4 px-8">
                  Join the Library
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/programmes" className="btn-secondary text-base py-4 px-8 !border-white/50 !text-blue hover:!bg-white hover:!text-[#0B3D91]">
                  Explore Online Degrees
                </Link>
              </div>

              <div className="flex items-center gap-6 mt-8 text-sm text-blue-200">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>Hundreds of students enrolled</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span>4+ online programmes</span>
                </div>
              </div>
            </div>

            {/* Hero image */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
                <Image
                  src="https://jmaqjjpqmrdedvwzpuhq.supabase.co/storage/v1/object/public/images/outside%20room.jpeg"
                  alt="SRS Digital Library reading Room"
                  width={600}
                  height={420}
                  className="object-cover w-full h-[400px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D91]/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 text-white text-sm">
                    <div className="font-semibold">SRS Digital Library</div>
                    <div className="text-blue-200 text-xs">Hasiya, Barsethi, Jaunpur — UP 222162</div>
                  </div>
                </div>
              </div>
              {/* Floating stat cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-3 text-center min-w-[100px]">
                <div className="text-2xl font-bold text-[#0B3D91]">NAAC</div>
                <div className="text-xs font-semibold text-[#F97316]">A+ Grade</div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-3 text-center min-w-[110px]">
                <div className="text-2xl font-bold text-[#0B3D91]">24x7</div>
                <div className="text-xs font-semibold text-gray-600">Power Backup</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FACILITIES ───────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#F97316] font-semibold text-sm uppercase tracking-wider mb-2">World-Class Study Environment</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Why Study With Us?</h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Everything you need to focus and succeed — right here in Barsethi, without the city commute.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-gray-100 transition-all duration-200 hover:-translate-y-0.5 group">
                <div className="w-12 h-12 bg-[#0B3D91]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#0B3D91] transition-colors">
                  <Icon className="w-6 h-6 text-[#0B3D91] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">{label}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRUST BANNER ─────────────────────────────────────── */}
      <section className="py-12 bg-[#0B3D91]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-shrink-0 text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg mb-3">
                <GraduationCap className="w-10 h-10 text-[#0B3D91]" />
              </div>
              <div className="bg-[#F97316] text-white text-sm font-bold px-4 py-1 rounded-full">NAAC A+</div>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Officially Recognized University Counselling Centre
              </h2>
              <p className="text-blue-100 leading-relaxed">
                SRS Digital Library is an officially appointed <strong className="text-white">Academic Counsellor</strong> for{' '}
                <strong className="text-white">Mangalayatan University</strong>, Aligarh — a NAAC A+ accredited institution
                recognized by the Government of India. Appointment Ref: <span className="font-mono text-orange-300">MU/ALI//2026-27/254</span>, dated 21-05-2026.
                Our role is to provide academic counselling, career advice, and help students enroll in government-recognized online degree programmes.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link href="/programmes" className="bg-[#F97316] text-white font-semibold rounded-xl px-6 py-3 hover:bg-orange-400 transition-colors inline-flex items-center gap-2 whitespace-nowrap">
                View Programmes <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROGRAMMES PREVIEW ───────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#F97316] font-semibold text-sm uppercase tracking-wider mb-2">Online Degree Programmes</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Earn a Degree Without Leaving Your Town</h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Choose from Bachelor's and Master's programmes from Mangalayatan University — valid for jobs and higher studies across India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programmes.map(prog => (
              <div key={prog.slug} className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-[#0B3D91] transition-all duration-200 hover:shadow-md group flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${prog.color === 'orange' ? 'bg-[#F97316]/15 text-[#F97316]' : 'bg-[#0B3D91]/10 text-[#0B3D91]'}`}>
                    {prog.badge}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-1">{prog.name}</h3>
                <p className="text-gray-500 text-xs mb-4">{prog.level}</p>
                <ul className="space-y-2 flex-1">
                  {prog.highlights.map(h => (
                    <li key={h} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-[#F97316] flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/enroll?programme=${prog.slug}`}
                  className="mt-6 w-full text-center py-2.5 px-4 rounded-xl bg-[#0B3D91] text-white text-sm font-semibold hover:bg-blue-800 transition-colors group-hover:bg-[#F97316]"
                >
                  Enroll Now
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/programmes" className="inline-flex items-center gap-2 text-[#0B3D91] font-semibold hover:text-[#F97316] transition-colors">
              View Full Programme Details <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#F97316] font-semibold text-sm uppercase tracking-wider mb-2">Simple 3-Step Process</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* connector line */}
            <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-[#0B3D91]/20" />
            {steps.map((step, i) => (
              <div key={step.n} className="relative text-center">
                <div className="w-20 h-20 bg-[#0B3D91] text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl font-bold">{step.n}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                {i < steps.length - 1 && (
                  <ChevronRight className="hidden md:block absolute top-10 -right-4 w-8 h-8 text-[#0B3D91]/30 z-10" />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/enroll" className="btn-primary text-base py-4 px-8">
              Start Your Journey <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── PHOTO GALLERY STRIP ──────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Inside Our Library</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { src: 'https://jmaqjjpqmrdedvwzpuhq.supabase.co/storage/v1/object/public/images/insideroomcctv.jpeg', alt: 'Reading hall with students' },
              { src: 'https://jmaqjjpqmrdedvwzpuhq.supabase.co/storage/v1/object/public/images/inside%20room%20ac%20-%20Copy.jpeg', alt: 'Air-conditioned study room' },
              { src: 'https://jmaqjjpqmrdedvwzpuhq.supabase.co/storage/v1/object/public/images/Cctvoutsideroom%20-%20Copy.jpeg', alt: 'CCTV outside room' },
              { src: 'https://jmaqjjpqmrdedvwzpuhq.supabase.co/storage/v1/object/public/images/bathroom%20-%20Copy.jpeg', alt: 'Clean washroom' },
            ].map(img => (
              <div key={img.src} className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MAP + CONTACT ────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-[#F97316] font-semibold text-sm uppercase tracking-wider mb-2">Find Us</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Visit SRS Digital Library</h2>

              <div className="space-y-4 mb-8">
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-[#F97316] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900">Address</div>
                    <div className="text-gray-600 leading-relaxed">
                      Hasiya, Sarsara, Miya Ka Chak, Barsethi<br />
                      Jaunpur, Uttar Pradesh – 222162<br />
                      <span className="text-sm text-gray-500">Near Miya Ka Chak Tiraha, beside Holy Angel English School</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Phone className="w-5 h-5 text-[#F97316] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900">Phone</div>
                    <a href="tel:9415660616" className="text-[#0B3D91] hover:text-[#F97316] font-medium transition-colors">
                      94156 60616
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:9415660616"
                  className="btn-primary flex-1 text-center py-3"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
                <a
                  href="https://www.google.com/maps/place/SRS+Digital+Library,+HFMM%2B57Q+Hasiya+Ramchandrpur+Uttar+Pradesh,+Miyachak+hasiya+sarsara,+near+Miya+ka+chak+tiraha,+beside+Holy+angel+english+school,+Miyachak,+Ramchandarpur,+Hasiya,+Uttar+Pradesh+222162/data=!4m2!3m1!1s0x399019007038cfe9:0x74a143c5f33ac72b!18m1!1e1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex-1 text-center py-3"
                >
                  <MapPin className="w-4 h-4" />
                  Get Directions
                </a>
              </div>
            </div>

            {/* Map embed */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 h-80 lg:h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.6653282642537!2d82.48075357485001!3d25.582798915975527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399019007038cfe9%3A0x74a143c5f33ac72b!2sSRS%20Digital%20Library!5e0!3m2!1sen!2sin!4v1782656934834!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SRS Digital Library location"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
