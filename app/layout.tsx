import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'BookWA - WhatsApp Booking System for Salons & Clinics',
  description: 'Automate bookings on WhatsApp for salons, clinics and businesses. Customers book themselves. Start free today!',
  keywords: 'WhatsApp booking system, salon booking app, clinic appointment, automated booking Pakistan',
  openGraph: {
    title: 'BookWA - WhatsApp Booking System',
    description: 'Stop losing clients. Automate your bookings on WhatsApp.',
    url: 'https://bookwa.vercel.app',
    siteName: 'BookWA',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'BookWA - WhatsApp Booking System',
    description: 'Automate your bookings on WhatsApp. Start free!',
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%2316a34a'/><text y='75' x='10' font-size='75' font-family='Arial' font-weight='bold' fill='white'>B</text><circle cx='75' cy='25' r='18' fill='%2325D366'/><text y='33' x='67' font-size='20' font-family='Arial' fill='white'>W</text></svg>",
        type: 'image/svg+xml',
      }
    ]
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
