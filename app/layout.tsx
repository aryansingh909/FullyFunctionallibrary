import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ConditionalLayout from '@/components/layout/ConditionalLayout';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'SRS Digital Library — Online Degree Centre, Barsethi Jaunpur',
    template: '%s | SRS Digital Library',
  },
  description:
    'SRS Digital Library in Barsethi, Jaunpur — AC reading hall, free WiFi, 24x7 power backup. Officially authorized Mangalayatan University (NAAC A+) academic counselling centre for BA, BCA, MCA, MBA online degree programmes.',
  keywords: [
    'SRS Digital Library',
    'library Jaunpur',
    'online degree Jaunpur',
    'Mangalayatan University',
    'NAAC A+',
    'BA online',
    'BCA online',
    'MCA online',
    'MBA online',
    'Barsethi library',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'SRS Digital Library',
    title: 'SRS Digital Library — Study Locally, Earn a University Degree',
    description:
      'AC reading hall, free WiFi, 24x7 power backup in Barsethi Jaunpur. Authorized Mangalayatan University counselling centre — enroll in BA, BCA, MCA, MBA online programmes.',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
