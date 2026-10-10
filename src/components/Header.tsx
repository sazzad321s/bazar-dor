
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import Navlinks from './Navlinks';

      const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full"
  });

const Header = () => {



    return (
      
<header className=" border-b border-gray-200 bg-white">
  <nav className="mx-auto flex max-w-325 items-center justify-between px-4 py-3 ">
   
    {/* Logo and Brand */}
    <Link href='/'>
    <div className="flex items-center gap-2">
      <Image
        src="/logo-icon.png"
        alt="Bazar Dor"
        width={40}
        height={40}
        priority
        className="rounded-xl bg-green-700 p-2"
      />

      <div className="flex flex-col">
        <span className="text-xl font-bold leading-tight text-gray-900">
          বাজার দর
        </span>

        <span className="text-xs text-neutral-500">
          {date}
        </span>
      </div>
    </div>
    </Link>

    {/* Authentication Buttons */}
    <div className="flex items-center gap-3 sm:gap-5">
      <Link
        href="/login"
        className="text-sm font-medium text-gray-700 transition hover:text-green-700"
      >
        সাইন ইন
      </Link>

      <Link
        href="/signup"
        className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
      >
        সাইন আপ
      </Link>
    </div>

  </nav>
 <Navlinks />

</header>

    );
};

export default Header;