
"use client";

import { authClient } from '@/lib/auth-client';
import React from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { LogOut, UserRound } from 'lucide-react';

const ProfilePage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (!error) {
      toast.success("সাইন আউট সফল হয়েছে");
      router.push("/sign-in");
      router.refresh();
    }
  };

  const handleUpdateProfile = async(e:React.SubmitEvent<HTMLFormElement>) => {
          e.preventDefault();

          const formData = new FormData(e.currentTarget);
          const newUserData = Object.fromEntries(formData.entries()) as {name: string}
          await authClient.updateUser({
            ...newUserData,
          })
  }

  return (
    <div className="min-h-screen px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-lg">

        {/* Profile Heading */}
        <div className="mb-5">
          <h2 className="text-xl font-extrabold tracking-tight text-[#26332B] sm:text-2xl">
            আমার প্রোফাইল
          </h2>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* User Information Card */}
        <div className="flex flex-col gap-4 rounded-xl border border-[#E5EBE5] bg-[#FAFCFA] p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:p-5">

          {/* Name and Image */}
          <div className="flex min-w-0 items-center gap-3">
            <div className="avatar shrink-0">
              <div className="w-12 rounded-xl bg-gray-100 sm:w-14">
                {user?.image ? (
                  <Image
                    alt={user.name || "Profile"}
                    src={user.image}
                    width={56}
                    height={56}
                    className="h-full w-full rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex aspect-square h-full w-full items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <UserRound size={25} />
                  </div>
                )}
              </div>
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-sm font-bold text-[#26332B] sm:text-base">
                {user?.name}
              </h2>

              <p className="truncate text-xs text-gray-500 sm:text-sm">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Signout */}
          <button
            onClick={handleSignOut}
            className="flex shrink-0 items-center justify-center gap-1.5 self-start rounded-lg border border-red-400 bg-white px-3 py-2 text-xs font-medium text-red-500 transition hover:bg-red-50 sm:self-center"
          >
            <LogOut size={13} />
            সাইন আউট
          </button>
        </div>

        {/* Update Information Card */}
        <div className="mt-4 rounded-xl border border-[#E5EBE5] bg-[#FAFCFA] p-4 sm:p-5">

          <h3 className="mb-5 text-sm font-bold text-[#26332B]">
            তথ্য
          </h3>

       
<form onSubmit={handleUpdateProfile}>
  {/* Name Field */}
  <div>
    <label
      htmlFor="name"
      className="mb-2 block pl-1 text-xs font-medium text-gray-600"
    >
      নাম
    </label>

    <input
      id="name"
      name="name"
      type="text"
      defaultValue={user?.name || ''}
      placeholder="আপনার নাম লিখুন"
      className="h-10 w-full rounded-md border border-[#E5EBE5] bg-transparent px-3 text-sm text-[#26332B] outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
    />
  </div>

  {/* Update Button */}
  <button
    type="submit"
    className="mt-3 w-full rounded-md bg-emerald-700 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-800"
  >
    আপডেট
  </button>
</form>


        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
