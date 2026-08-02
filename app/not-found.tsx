import Link from 'next/link';
import { SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <SearchX className="w-16 h-16 text-gray-400 mb-4" />
      <h2 className="text-4xl font-bold text-gray-900 mb-2">404</h2>
      <p className="text-gray-600 mb-6">Aradığın sayfa bulunamadı.</p>
      <Link
        href="/"
        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-colors"
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}
