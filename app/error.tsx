'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Bir hata oluştu</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        Sayfa yüklenirken beklenmedik bir sorun oluştu. Lütfen tekrar deneyin.
      </p>
      <button
        onClick={reset}
        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-colors"
      >
        Tekrar Dene
      </button>
    </div>
  );
}
