"use client";
import React from 'react';
import { Code2 } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';


const SignInPage = () => {

   const onSubmit = async(e:React.SubmitEvent<HTMLFormElement>) => {
       e.preventDefault();

       const formData = new FormData(e.currentTarget);
       const userData = Object.fromEntries(formData.entries()) as { email: string ,password: string};

       const {data, error} = await authClient.signIn.email({
         ...userData,
         callbackURL: "/",
       })

       if(error){
        toast.error("সাইন ইন ব্যর্থ হয়েছে।");
        console.log(error);
        return;
       }

       if(data) {
        toast.success("সাইন ইন সফল হয়েছে।");
        console.log(data);
       }
   }

   const handleGoogleSignIn = async() => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/"
        })
   }

   const handleGithubSignIn = async() => {
        await authClient.signIn.social({
            provider: "github",
            callbackURL: "/"
        })
   }


    return (
        <div className='flex flex-col mt-5 items-center'>
            <h2 className='font-bold text-2xl'>সাইন ইন</h2>
            <p className='text-gray-500 text-sm my-2'>বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
            <form onSubmit={onSubmit}>
            <fieldset className="fieldset bg-[#FAFCFA] border-base-300 rounded-box w-[340] border p-4">
             

             

             <label className="label">ইমেইল</label>
             <input type="email" name="email" className="input" placeholder="you@example.com" />

             <label className="label">পাসওয়ার্ড</label>
             <input type="password" name="password" className="input" placeholder="কমপক্ষে ৮ অক্ষর" />

             <button type='submit' className="btn bg-green-700 hover:bg-green-800 text-white font-semibold rounded-md mt-4">সাইন ইন</button>

             <div className="my-2 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className="btn btn-outline px-2 text-xs border-green-700"
              onClick={handleGoogleSignIn}
            >
              <span className="font-bold text-base text-[#4285F4]">G</span>
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              className="btn btn-outline px-2 text-xs border-green-700"
              onClick={handleGithubSignIn}
            >
              <Code2 size={16} />
              GitHub দিয়ে চালিয়ে যান
            </button>
            </div>
             <div className='text-center mt-0.5 text-gray-500 text-sm'><span className='font-semibold text-black'>অ্যাকাউন্ট নেই?</span><Link href='/sign-up' className='underline decoration-green-600 text-green-600'> সাইন আপ করুন</Link></div>
            </fieldset>
            </form>
            <div className='text-center mt-3 text-gray-500  text-sm'><Link href='/' className='underline decoration-gray-500'>← হোম পেজে ফিরে যান</Link></div>
        </div>
    );
};

export default SignInPage;