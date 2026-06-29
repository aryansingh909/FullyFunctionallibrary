import Link from 'next/link';
import { MapPin, Phone, Mail, BookOpen, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B3D91] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-[#F97316] rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-base">SRS Digital Library</div>
                <div className="text-blue-200 text-xs">Est. Barsethi, Jaunpur</div>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed mb-4">
              Your local digital library and authorized Mangalayatan University
              Academic Counselling Centre. Study locally, earn a university degree.
            </p>
            <div className="inline-flex items-center gap-1 bg-[#F97316]/20 border border-[#F97316]/40 rounded-full px-3 py-1">
              <span className="text-orange-300 text-xs font-semibold">NAAC A+ Accredited Partner</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-blue-200 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About & Facilities' },
                { href: '/programmes', label: 'Degree Programmes' },
                { href: '/join-library', label: 'Join the Library' },
                { href: '/enroll', label: 'Enroll in a Degree' },
                { href: '/contact', label: 'Contact Us' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-blue-100 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* University */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-blue-200 mb-4">University Partner</h3>
            <p className="text-blue-100 text-sm mb-3">
              Mangalayatan University, Aligarh<br />
              <span className="text-orange-300 text-xs">NAAC A+ Accredited</span>
            </p>
            <div className="space-y-2 text-sm">
              <a
                href="https://www.mangalayatan.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-100 hover:text-white transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                www.mangalayatan.in
              </a>
              <a
                href="https://www.muonline.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-100 hover:text-white transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                www.muonline.ac.in
              </a>
              <p className="text-blue-200 text-xs">
                Ref: MU/ALI//2026-27/254<br />
                Dated: 21-05-2026
              </p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-blue-200 mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 text-[#F97316] flex-shrink-0 mt-0.5" />
                <span className="text-blue-100 leading-relaxed">
                  Hasiya, Sarsara, Miya Ka Chak<br />
                  Barsethi, Jaunpur<br />
                  Uttar Pradesh – 222162<br />
                  <span className="text-blue-300 text-xs">Near Miya Ka Chak Tiraha,<br />beside Holy Angel English School</span>
                </span>
              </div>
              <a href="tel:9415660616" className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-[#F97316]" />
                94156 60616
              </a>
              <a href="mailto:Krishnakumar909@gmail.com" className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-[#F97316]" />
                Krishnakumarsingh909@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-blue-300">
          <span>© {new Date().getFullYear()} SRS Digital Library. All rights reserved.</span>
          <span>Authorized Academic Counsellor — Mangalayatan University (Ref: MU/ALI//2026-27/254)</span>
        </div>
      </div>
    </footer>
  );
}
