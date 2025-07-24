import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Script from 'next/script'

export const metadata = {
  title: 'Lume Outdoor - Premium Outdoor Lighting Solutions',
  description: 'Transform your outdoor space with professional landscape lighting. Expert design, installation, and maintenance in Wichita, KS and surrounding areas.',
  keywords: ['outdoor lighting', 'landscape lighting', 'Wichita lighting', 'residential lighting', 'commercial lighting'],
  authors: [{ name: 'Lume Outdoor' }],
  creator: 'Lume Outdoor',
  viewport: 'width=device-width, initial-scale=1.0, viewport-fit=cover',
  themeColor: '#000000',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lumeoutdoor.com',
    siteName: 'Lume Outdoor',
    title: 'Lume Outdoor - Premium Outdoor Lighting Solutions',
    description: 'Transform your outdoor space with professional landscape lighting. Expert design, installation, and maintenance in Wichita, KS.',
    images: [
      {
        url: '/Hero_photo.jpg',
        width: 1200,
        height: 630,
        alt: 'Lume Outdoor - Professional Landscape Lighting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lume Outdoor - Premium Outdoor Lighting Solutions',
    description: 'Transform your outdoor space with professional landscape lighting. Expert design, installation, and maintenance in Wichita, KS.',
    images: ['/Hero_photo.jpg'],
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
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17048667028"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17048667028');
            
            // Conversion tracking function
            window.gtag_report_conversion = function(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                'send_to': 'AW-17048667028/4qmOCIyqn-UaEJSHuME_',
                'value': 1.0,
                'currency': 'USD',
                'event_callback': callback
              });
              return false;
            }
          `}
        </Script>
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}