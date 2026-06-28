import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Wind, Wifi, Zap, ShieldCheck, Car, Bath, Clock, MapPin, ArrowRight } from 'lucide-react';
import { supabasePublic } from '@/lib/supabase';
import { LibraryTiming } from '@/lib/types';

export const metadata: Metadata = {
  title: 'About & Facilities',
  description: 'SRS Digital Library offers a fully air-conditioned reading hall, free WiFi, 24x7 power backup, CCTV security, clean washrooms and parking in Barsethi, Jaunpur.',
};

const facilities = [
  {
    icon: Wind,
    title: 'Fully Air-Conditioned Reading Room',
    desc: 'Beat the Jaunpur heat year-round. Our AC Rooms keeps you cool and comfortable so you can focus entirely on your studies, even in peak summer.',
  },
  {
    icon: Wifi,
    title: 'Free High-Speed WiFi',
    desc: 'Reliable internet for research, accessing your LMS portal, downloading study materials, and video sessions — all included at no extra charge.',
  },
  {
    icon: Zap,
    title: '24x7 Power Backup',
    desc: 'No more study interruptions during power cuts. Our uninterrupted power supply keeps the lights, fans, AC, and WiFi running without a break.',
  },
  {
    icon: ShieldCheck,
    title: 'CCTV Surveillance',
    desc: 'Your safety is our priority. The entire premises — inside and outside — is monitored by CCTV cameras 24 hours a day for a safe study environment.',
  },
  {
    icon: Car,
    title: 'Parking Available',
    desc: 'Convenient parking space for two-wheelers and vehicles. No need to worry about where to leave your vehicle while you study.',
  },
  {
    icon: Bath,
    title: 'Clean Washroom',
    desc: 'Well-maintained, hygienic washroom available on premises. We take cleanliness seriously so you can study in comfort throughout the day.',
  },
];

const galleryImages = [
  { src: 'https://jmaqjjpqmrdedvwzpuhq.supabase.co/storage/v1/object/public/images/Cctvoutsideroom%20-%20Copy.jpeg', alt: 'Students studying in the reading hall' },
  { src: 'https://jmaqjjpqmrdedvwzpuhq.supabase.co/storage/v1/object/public/images/inside%20room%20ac%20-%20Copy.jpeg', alt: 'AC unit and study desks' },
  { src: 'https://jmaqjjpqmrdedvwzpuhq.supabase.co/storage/v1/object/public/images/bathroom%20-%20Copy.jpeg', alt: 'Common area and entry' },
  { src: 'https://jmaqjjpqmrdedvwzpuhq.supabase.co/storage/v1/object/public/images/insideroomcctv.jpeg', alt: 'CCTV security system' },
  { src: 'https://jmaqjjpqmrdedvwzpuhq.supabase.co/storage/v1/object/public/images/insideroomcommongate.jpeg', alt: 'Clean washroom facility' },
  { src: 'https://jmaqjjpqmrdedvwzpuhq.supabase.co/storage/v1/object/public/images/outside%20room.jpeg', alt:'photo' },
  { src: 'https://jmaqjjpqmrdedvwzpuhq.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-06-28%20at%202.02.52%20AM.jpeg', alt:'photo'},
];

async function getLibraryTimings(): Promise<LibraryTiming | null> {
  const { data } = await supabasePublic
    .from('site_settings')
    .select('value')
    .eq('key', 'library_timings')
    .maybeSingle();
  return data?.value as LibraryTiming | null;
}

export default async function AboutPage() {
  const timings = await getLibraryTimings();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0B3D91] to-[#1a52b5] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#F97316] font-semibold text-sm uppercase tracking-wider mb-3">About SRS Digital Library</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Study Smart. Study Local.</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed">
            A modern digital library in Barsethi, Jaunpur — built for students who deserve a world-class study environment without the city commute.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#F97316] font-semibold text-sm uppercase tracking-wider mb-3">Our Story</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-5">Bringing Opportunity Closer to Home</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  SRS Digital Library was founded with a simple but powerful belief: students in small towns deserve
                  the same quality learning environment as students in big cities. Located in Hasiya, Barsethi, Jaunpur,
                  we serve students from across the district who want to study seriously but can't or don't want to
                  move to a city.
                </p>
                <p>
                  Our library features a fully air-conditioned reading room, free WiFi, 24x7 power backup, and CCTV
                  security — everything a dedicated student needs to focus and succeed.
                </p>
                <p>
                  We are also officially appointed as an <strong>Academic Counsellor</strong> for{' '}
                  <strong>Mangalayatan University</strong>, Aligarh — a NAAC A+ accredited university. This means
                  students can not only study here, but also enroll in government-recognized online BA, BCA, MCA,
                  and MBA programmes — right from our library, without traveling to Aligarh or any other city.
                </p>
              </div>
              <Link href="/enroll" className="btn-primary mt-6 inline-flex">
                Explore Online Programmes <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://jmaqjjpqmrdedvwzpuhq.supabase.co/storage/v1/object/public/images/Cctvoutsideroom%20-%20Copy.jpeg"
                  alt="Students studying at SRS Digital Library"
                  width={600}
                  height={420}
                  className="object-cover w-full h-[380px]"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-[#0B3D91] text-white rounded-2xl p-4 shadow-xl">
                <div className="text-3xl font-bold">NAAC</div>
                <div className="text-[#F97316] font-bold text-sm">A+ Partner</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#F97316] font-semibold text-sm uppercase tracking-wider mb-2">What We Offer</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Library Facilities</h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Everything carefully designed to give you the best possible study experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group">
                <div className="w-12 h-12 bg-[#0B3D91]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#0B3D91] transition-colors">
                  <Icon className="w-6 h-6 text-[#0B3D91] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Library Timings */}
      <section className="py-16 bg-[#0B3D91]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 bg-[#F97316] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Clock className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-6">Library Timings</h2>

          {timings ? (
            <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-6">
              <div className="bg-white/10 border border-white/20 rounded-2xl p-5 text-left">
                <div className="text-blue-200 text-sm font-medium mb-1">{timings.weekdays.label}</div>
                <div className="text-white text-xl font-bold">{timings.weekdays.open} – {timings.weekdays.close}</div>
              </div>
              <div className="bg-white/10 border border-white/20 rounded-2xl p-5 text-left">
                <div className="text-blue-200 text-sm font-medium mb-1">{timings.sunday.label}</div>
                <div className="text-white text-xl font-bold">{timings.sunday.open} – {timings.sunday.close}</div>
              </div>
            </div>
          ) : (
            <div className="bg-white/10 border border-white/20 rounded-2xl p-6 max-w-sm mx-auto mb-6">
              <p className="text-blue-100">Contact us for current library timings.</p>
            </div>
          )}

          {timings?.note && (
            <p className="text-blue-200 text-sm italic mb-6">{timings.note}</p>
          )}

          <a href="tel:9415660616" className="inline-flex items-center gap-2 bg-[#F97316] text-white font-semibold rounded-xl px-6 py-3 hover:bg-orange-400 transition-colors">
            <MapPin className="w-4 h-4" />
            Call to Confirm Timings
          </a>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#F97316] font-semibold text-sm uppercase tracking-wider mb-2">Photo Gallery</p>
            <h2 className="text-3xl font-bold text-gray-900">See for Yourself</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {galleryImages.map((img, i) => (
              <div
                key={img.src}
                className={`relative rounded-xl overflow-hidden ${i === 0 ? 'col-span-2 row-span-2 md:col-span-1 md:row-span-1 lg:col-span-2 lg:row-span-2' : ''} aspect-square`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Join?</h2>
          <p className="text-gray-600 mb-8">Reserve your seat today or inquire about online degree programmes. We'll call you within 24 hours.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/join-library" className="btn-primary py-4 px-8">
              Join the Library <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/enroll" className="btn-secondary py-4 px-8">
              Enroll in a Degree
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
