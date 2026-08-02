import Loader from '@/components/Loader';

export default function Loading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <Loader size="lg" text="Yükleniyor..." />
    </div>
  );
}
