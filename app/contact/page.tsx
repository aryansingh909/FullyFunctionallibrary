import type { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact SRS Digital Library in Barsethi, Jaunpur. Phone: 9415660616. Visit us near Miya Ka Chak Tiraha, beside Holy Angel English School.',
};

const MAPS_URL = 'https://www.google.com/maps/place/SRS+Digital+Library,+HFMM%2B57Q+Hasiya+Ramchandrpur+Uttar+Pradesh,+Miyachak+hasiya+sarsara,+near+Miya+ka+chak+tiraha,+beside+Holy+angel+english+school,+Miyachak,+Ramchandarpur,+Hasiya,+Uttar+Pradesh+222162/data=!4m2!3m1!1s0x399019007038cfe9:0x74a143c5f33ac72b!18m1!1e1';

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0B3D91] to-[#1a52b5] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#F97316] font-semibold text-sm uppercase tracking-wider mb-3">Get in Touch</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-blue-100 text-lg max-w-xl mx-auto">
            Have a question? Want to visit? We're here to help — call, message, or come see us.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact info + map */}
            <div className="space-y-6">
              {/* Info cards */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-5">
                <h2 className="text-xl font-bold text-gray-900">Find Us</h2>

                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-[#F97316]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#F97316]" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-0.5">Address</div>
                    <address className="not-italic text-gray-600 text-sm leading-relaxed">
                      Hasiya, Sarsara, Miya Ka Chak<br />
                      Barsethi, Jaunpur<br />
                      Uttar Pradesh – 222162
                    </address>
                    <p className="text-xs text-gray-400 mt-1">Near Miya Ka Chak Tiraha, beside Holy Angel English School</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-[#F97316]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#F97316]" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-0.5">Phone</div>
                    <a href="tel:9415660616" className="text-[#0B3D91] hover:text-[#F97316] font-medium text-lg transition-colors">
                      94156 60616
                    </a>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-[#F97316]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#F97316]" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-0.5">Email</div>
                    <a href="mailto:Krishnakumarsingh909@gmail.com" className="text-[#0B3D91] hover:text-[#F97316] font-medium transition-colors break-all">
                      Krishnakumarsingh909@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-[#F97316]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#F97316]" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-0.5">Library Hours</div>
                    <p className="text-gray-600 text-sm">Call us for current timings. Open all days including public holidays.</p>
                  </div>
                </div>
              </div>

              {/* Directions button */}
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#0B3D91] text-white font-semibold rounded-xl py-3 hover:bg-blue-800 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Get Directions on Google Maps
              </a>

              {/* Embedded map */}
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm h-72">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114.3!2d82.5!3d25.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399019007038cfe9%3A0x74a143c5f33ac72b!2sSRS+Digital+Library!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SRS Digital Library on Google Maps"
                />
              </div>
            </div>

            {/* Contact form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* University contact */}
      <section className="py-12 bg-[#0B3D91]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Mangalayatan University Contact</h2>
          <p className="text-blue-200 mb-5 text-sm">For direct university queries:</p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-sm">
            <div className="bg-white/10 border border-white/20 rounded-xl p-4">
              <div className="text-blue-200 text-xs mb-1">Phone</div>
              <div className="text-white font-medium">+91 8393879627</div>
              <div className="text-white font-medium">+91 9358333333</div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl p-4">
              <div className="text-blue-200 text-xs mb-1">Email</div>
              <a href="mailto:info@mangalayatan.edu.in" className="text-white font-medium hover:text-[#F97316] transition-colors break-all">
                info@mangalayatan.edu.in
              </a>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl p-4">
              <div className="text-blue-200 text-xs mb-1">Online Portal</div>
              <a href="https://www.muonline.ac.in" target="_blank" rel="noopener noreferrer" className="text-white font-medium hover:text-[#F97316] transition-colors">
                www.muonline.ac.in
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
