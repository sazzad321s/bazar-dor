
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const date = new Date().toLocaleDateString('bn-BD', {
  dateStyle: 'full',
});

const Hero = () => {
  return (
    <div className="relative my-5 flex min-h-65 flex-col items-center justify-between overflow-hidden rounded-2xl border border-emerald-100 bg-[#f8fbf8] px-5 py-5 sm:px-8 sm:py-8 md:min-h-75 md:flex-row md:px-10 lg:px-12 lg:w-325 mx-2">

      {/* Left Content */}
      <div className="z-10 w-full md:w-[68%]">
        <span className="inline-block rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:text-sm">
          {date}
        </span>

        <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#26332b] sm:text-4xl lg:text-5xl">
          আজকের বাজারের দাম এক নজরে
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base lg:text-lg">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
          বাজারদরের নির্ভরযোগ্য, সহজ ও সর্বশেষ তথ্য।
          বাজারের প্রতিদিনের পরিস্থিতি জানুন এক জায়গায়।
        </p>
         <Link href="#allproducts">
        <button className="mt-6 rounded-lg bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-900/20 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-800 hover:shadow-lg">
          সব পণ্য দেখুন
        </button>
        </Link>
      </div>

      {/* Right Illustration */}
      <div className="mt-6 flex w-full items-center justify-center md:mt-0 md:w-[32%]">
        <Image
          src="/bazar-hero.png"
          alt="বাজারের সবজি ও ফলের ঝুড়ি"
          width={300}
          height={300}
          priority
          className="h-48 w-48 object-contain sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-72 lg:w-72"
        />
      </div>

    </div>
  );
};

export default Hero;
