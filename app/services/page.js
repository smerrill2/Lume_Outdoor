import React from 'react';
import ServicesIndexPage from '@/components/ServicesIndexPage';

export const metadata = {
  title: 'Our Services - Professional Outdoor Lighting | Lume Outdoor',
  description: 'Explore our full range of professional outdoor lighting services including residential landscape, commercial, architectural, pathway, deck & patio, pool, security, and holiday lighting.',
  openGraph: {
    title: 'Our Services - Professional Outdoor Lighting | Lume Outdoor',
    description: 'Explore our full range of professional outdoor lighting services.',
  },
};

export default function ServicesPage() {
  return <ServicesIndexPage />;
}
