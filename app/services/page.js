import React from 'react';
import ServicesIndexPage from '@/components/ServicesIndexPage';

export const metadata = {
  title: 'Our Services - Professional Outdoor Lighting | Lume Outdoor',
  description: 'Explore professional outdoor lighting design, installation, landscape lighting repair, and low-voltage system maintenance services in Wichita, KS.',
  openGraph: {
    title: 'Our Services - Professional Outdoor Lighting | Lume Outdoor',
    description: 'Outdoor lighting design, installation, repair, and maintenance services in Wichita, KS.',
  },
};

export default function ServicesPage() {
  return <ServicesIndexPage />;
}
