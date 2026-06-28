'use client';

import { Phone, MessageCircle } from 'lucide-react';

const PHONE = '9415660616';
const WA_MESSAGE = encodeURIComponent(
  'Hello! I saw your website and would like to know more about SRS Digital Library and the online degree programmes.'
);

export default function FloatingCTA() {
  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col gap-3 items-end">
      {/* WhatsApp */}
      <a
        href={`https://wa.me/91${PHONE}?text=${WA_MESSAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group flex items-center gap-2 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
      >
        <span className="hidden sm:block max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out pl-0 group-hover:pl-4 text-sm font-semibold whitespace-nowrap">
          Chat on WhatsApp
        </span>
        <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
          <MessageCircle className="w-7 h-7" />
        </div>
      </a>

      {/* Call Now */}
      <a
        href={`tel:${PHONE}`}
        aria-label="Call Now"
        className="group flex items-center gap-2 bg-[#F97316] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
      >
        <span className="hidden sm:block max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out pl-0 group-hover:pl-4 text-sm font-semibold whitespace-nowrap">
          Call Now
        </span>
        <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
          <Phone className="w-6 h-6" />
        </div>
      </a>
    </div>
  );
}
