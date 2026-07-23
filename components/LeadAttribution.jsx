'use client';

import { useEffect } from 'react';
import { captureLeadAttribution } from '@/lib/leadAttribution';

export default function LeadAttribution() {
  useEffect(() => {
    captureLeadAttribution();
  }, []);

  return null;
}

