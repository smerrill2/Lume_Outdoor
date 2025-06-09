import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Lume Outdoor - Premium Outdoor Lighting Solutions',
  description: 'Transform your outdoor space with professional landscape lighting. Expert design, installation, and maintenance in Wichita, KS and surrounding areas.',
  keywords: ['outdoor lighting', 'landscape lighting', 'Wichita lighting', 'residential lighting', 'commercial lighting'],
  authors: [{ name: 'Lume Outdoor' }],
  creator: 'Lume Outdoor',
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
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}