
import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-12 w-full border-t border-[#E5EBE5] bg-[#FAFCFA]">
      <div className="mx-auto flex w-full max-w-325 flex-col items-center justify-between gap-3 px-4 py-5 text-center sm:flex-row sm:gap-5 sm:px-4 sm:py-6 sm:text-left lg:px-5">

        {/* Left Side */}
        <p className="text-xs leading-5 text-gray-600">
          বাজার দর — প্রতিদিনের পণ্যের দাম জানুন সহজে।
        </p>

        {/* Right Side */}
        <p className="text-xs leading-5 text-gray-600 sm:max-w-[50%] sm:text-right">
          সর্বশেষ বাজার দর দেখুন; বাজার পরিস্থিতির ওপর নির্ভর করে দাম পরিবর্তিত হতে পারে।
        </p>

      </div>
    </footer>
  );
};

export default Footer;
