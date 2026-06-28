import type { Metadata } from 'next';
import JoinLibraryForm from './JoinLibraryForm';
import { Wind, Wifi, Zap, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { supabasePublic } from '@/lib/supabase';
import { LibraryPlan } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Join the Library',
  description: 'Reserve your seat at SRS Digital Library in Miyanchak, Barsethi, Jaunpur. AC reading Room, free WiFi, 24x7 power backup. Daily, monthly, quarterly, and yearly plans available.',
};

async function getPlans(): Promise<LibraryPlan[]> {
  const { data } = await supabasePublic
    .from('site_settings')
    .select('value')
    .eq('key', 'library_plans')
    .maybeSingle();
  return (data?.value as LibraryPlan[]) ?? [];
}

export default async function JoinLibraryPage() {
  const plans = await getPlans();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0B3D91] to-[#1a52b5] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#F97316] font-semibold text-sm uppercase tracking-wider mb-3">Reserve Your Seat</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Join SRS Digital Library</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Fill in the quick form below. We'll call you within 24 hours to confirm your seat and answer any questions.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <JoinLibraryForm plans={plans} />
            </div>

            {/* Sidebar info */}
            <div className="space-y-6">
              {/* Why join */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Why Join Our Library?</h2>
                <div className="space-y-3">
                  {[
                    { icon: Wind, text: 'Fully air-conditioned reading Room' },
                    { icon: Wifi, text: 'Free high-speed WiFi included' },
                    { icon: Zap, text: '24x7 uninterrupted power supply' },
                    { icon: ShieldCheck, text: 'CCTV-secured, safe environment' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-3 text-gray-700">
                      <Icon className="w-4 h-4 text-[#F97316] flex-shrink-0" />
                      <span className="text-sm">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Plans */}
              {plans.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-5">Our Plans</h2>
                  <div className="space-y-4">
                    {plans.map((plan) => (
                      <div key={plan.id} className="border border-gray-100 rounded-xl p-4 hover:border-[#0B3D91]/30 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="font-bold text-gray-900">{plan.name}</div>
                            <div className="text-gray-500 text-xs">{plan.description}</div>
                          </div>
                          <div className="text-[#0B3D91] font-bold text-sm text-right ml-2 flex-shrink-0">{plan.price}</div>
                        </div>
                        <div className="space-y-1">
                          {plan.features.slice(0, 3).map(f => (
                            <div key={f} className="flex items-center gap-1.5 text-xs text-gray-600">
                              <CheckCircle2 className="w-3 h-3 text-[#F97316] flex-shrink-0" />
                              {f}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-4">* Contact us for exact pricing and latest offers.</p>
                </div>
              )}

              {/* Location */}
              <div className="bg-[#0B3D91] text-white rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-2">Visit Us</h3>
                <p className="text-blue-200 text-sm leading-relaxed mb-4">
                  Hasiya, Sarsara, Miya Ka Chak, Barsethi, Jaunpur, UP – 222162<br />
                  Near Miya Ka Chak Tiraha, beside Holy Angel English School
                </p>
                <a href="tel:9415660616" className="inline-flex items-center gap-2 bg-[#F97316] text-white font-semibold rounded-lg px-4 py-2 hover:bg-orange-400 transition-colors text-sm">
                  Call: 94156 60616
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
