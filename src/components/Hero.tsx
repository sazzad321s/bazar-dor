import Image from 'next/image';
import React from 'react';

      const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full"
  });

const Hero = () => {
    return (
    
<section className="my-4">
  <div className="relative flex min-h-55 flex-col items-center justify-between overflow-hidden rounded-2xl border border-emerald-100 bg-[#f8fbf8] px-5 py-6 sm:flex-row sm:px-8 md:px-10">

    {/* Left Content */}
    <div className="z-10 w-full sm:max-w-[65%]">
      <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
        {date}
      </span>

      <h1 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-[#26332b] sm:text-3xl">
        আজকের বাজারের দাম এক নজরে
      </h1>

      <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
        বাজারদরের নির্ভরযোগ্য, সহজ, সর্বশেষ-সার্বিক এবং বাজারের
        পরিস্থিতি এক জায়গায়।
      </p>

      <button className="mt-5 rounded-md bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-900/20 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-800">
        সব পণ্য দেখুন
      </button>
    </div>

    {/* Right Illustration */}
    <div className="mt-5 flex w-full items-center justify-center sm:mt-0 sm:w-[30%]">
      <Image
        src="/bazar-hero.png"
        alt="বাজারের সবজি ও ফলের ঝুড়ি"
        width={128}
        height={160}
        className="h-32 w-40 object-contain sm:h-36 sm:w-44"
      />
    </div>

  </div>
</section>

    );
};

export default Hero;