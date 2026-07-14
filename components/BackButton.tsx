'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  href: string;
  label?: string;
}

export default function BackButton({ href, label = 'Geri Dön' }: BackButtonProps) {
  return (
    <div className="md:hidden flex justify-end p-4">
      <Link
        href={href}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 border border-gray-200 text-gray-900 text-sm hover:bg-gray-200 transition-colors z-10"
      >
        <ArrowLeft className="w-4 h-4" />
        {label}
      </Link>
    </div>
  );
}
