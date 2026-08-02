'use client';

import { useEffect, useState } from 'react';

function useLoadingProgress(isLoading: boolean) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setProgress(0);
      return;
    }

    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 8;
      if (p > 90) p = 90;
      setProgress(Math.min(100, Math.round(p)));
    }, 180);

    return () => clearInterval(interval);
  }, [isLoading]);

  return progress;
}

interface QRGenerateButtonProps {
  loading: boolean;
  disabled?: boolean;
  onClick: () => void;
  label?: string;
  loadingLabel?: string;
  className?: string;
}

export default function QRGenerateButton({
  loading,
  disabled,
  onClick,
  label = 'QR Kod Oluştur',
  loadingLabel = 'Oluşturuluyor...',
  className = '',
}: QRGenerateButtonProps) {
  const progress = useLoadingProgress(loading);

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={onClick}
        disabled={loading || disabled}
        className={`btn-primary w-full rounded-2xl text-white font-semibold disabled:opacity-50 text-sm md:text-base py-3 md:py-4 ${className}`}
      >
        {loading ? `${loadingLabel} %${progress}` : label}
      </button>
      {loading && (
        <div className="w-full h-2 md:h-2.5 bg-gray-100 rounded-full overflow-hidden mt-3">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-200 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
