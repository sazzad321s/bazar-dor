"use client";
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

const UserInfo = () => {

    const {data: session} = authClient.useSession();
    const user = session?.user;
    const router = useRouter();

    const handleSignOut = async() => {
        const {error} = await authClient.signOut();
        
        if(!error){
            toast.success("সাইন আউট সফল হয়েছে");
            router.push("/sign-in");
            router.refresh();
        }
    }


    return (
        <div>
            {
                user ? (<div className="flex flex-row items-center gap-3 sm:gap-2">
          <Link href="/profile" className="flex min-w-0 items-center gap-2">
            <div className="avatar shrink-0">
              <div className="w-9 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100 sm:w-10">
                {user.image ? (
                  <Image
                    alt={user.name || "Profile"}
                    src={user.image}
                    width={40}
                    height={40}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 font-bold text-gray-600">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}
              </div>
            </div>

            <h2 className="max-w-28 truncate font-medium sm:max-w-36">
              {user.name?.split(" ")[0]}
            </h2>
          </Link>

          <button
            onClick={handleSignOut}
            className="btn btn-error border-red-600 bg-white text-red-600 py-2 btn-xs shrink-0 hidden sm:flex"
          >
            <LogOut size={14} />
            সাইন আউট
          </button>
        </div>)
                 :
                 (<div className="flex items-center gap-3 sm:gap-5">
      <Link
        href="/sign-in"
        className="text-sm font-medium text-gray-700 transition hover:text-green-700"
      >
        সাইন ইন
      </Link>

      <Link
        href="/sign-up"
        className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
      >
        সাইন আপ
      </Link>
    </div>)
            }
        </div>
    );
};

export default UserInfo;