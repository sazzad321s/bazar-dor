import { bn } from '@/lib/utils';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="text-7xl font-bold text-black sm:text-8xl">
        {bn(404)}
      </h2>

      <h2 className="mt-4 text-lg font-semibold text-black sm:text-2xl">
        দুঃখিত, পৃষ্ঠাটি খুঁজে পাওয়া যায়নি।
      </h2>

      <div className="mt-6">
        <Link
          href="/"
          className="inline-block rounded-lg bg-green-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-green-700 sm:text-base"
        >
          হোমে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;