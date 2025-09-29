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

export const metadata: Metadata = {
  title: "Gay Test - Fun Personality Quiz | Discover Your True Self",
  description: "Take our fun and entertaining personality quiz! Answer 5 simple questions and discover your true self. Available in English and Russian. Just for fun!",
  keywords: "gay test, personality quiz, fun quiz, entertainment, personality test, quiz, fun, gay, test, personality, questions, answers, English, Russian",
  authors: [{ name: "Gay Test App" }],
  creator: "Gay Test App",
  publisher: "Gay Test App",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://gay-test-app.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/',
      'ru': '/?lang=ru',
    },
  },
  openGraph: {
    title: "Gay Test - Fun Personality Quiz",
    description: "Take our fun and entertaining personality quiz! Answer 5 simple questions and discover your true self.",
    url: 'https://gay-test-app.vercel.app',
    siteName: 'Gay Test App',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Gay Test - Fun Personality Quiz',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Gay Test - Fun Personality Quiz",
    description: "Take our fun and entertaining personality quiz! Answer 5 simple questions and discover your true self.",
    images: ['/og-image.png'],
    creator: '@gaytestapp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#8B5CF6" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Gay Test - Fun Personality Quiz",
              "description": "Take our fun and entertaining personality quiz! Answer 5 simple questions and discover your true self.",
              "url": "https://gay-test-app.vercel.app",
              "applicationCategory": "Entertainment",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Organization",
                "name": "Gay Test App"
              },
              "inLanguage": ["en", "ru"],
              "isAccessibleForFree": true,
              "browserRequirements": "Requires JavaScript. Requires HTML5.",
              "softwareVersion": "1.0.0"
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
