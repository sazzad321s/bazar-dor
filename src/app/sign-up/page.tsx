"use client";
import React from 'react';
import { Code2 } from 'lucide-react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


const SignUpPage = () => {

    const router = useRouter(); 

   const onSubmit = async(e:React.SubmitEvent<HTMLFormElement>) => {
       e.preventDefault();

       const formData = new FormData(e.currentTarget);
       const userData = Object.fromEntries(formData.entries()) as {name: string , email: string , image: string , password: string};

       const {data, error} = await authClient.signUp.email({
         ...userData,
         callbackURL: "/",
       })

       if(error){
        toast.error("সাইন আপ ব্যর্থ হয়েছে।");
        console.log(error);
        return;
       }

       if(data) {
        toast.success("সাইন আপ সফল হয়েছে।");
        console.log(data);
        router.push("/")
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
            <h2 className='font-bold text-2xl'>অ্যাকাউন্ট তৈরি করুন</h2>
            <p className='text-gray-500 text-sm my-2'>বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
            <form onSubmit={onSubmit}>
            <fieldset className="fieldset bg-[#FAFCFA] border-base-300 rounded-box w-[340] border p-4">
             

             <label className="label">নাম</label>
             <input type="text" name="name" className="input" placeholder="যেমন: রহিম উদ্দিন" required/>

             <label className="label">ইমেইল</label>
             <input type="email" name="email" className="input" placeholder="you@example.com" required/>

             <label className="label">পাসওয়ার্ড</label>
             <input type="password" name="password" className="input" placeholder="কমপক্ষে ৮ অক্ষর" required  minLength={8}/>

             <label className="label">পাসওয়ার্ড নিশ্চিত করুন</label>
             <input type="password" name="password" className="input" placeholder="আবার লিখুন" required  minLength={8}/>

             <button type='submit' className="btn bg-green-700 hover:bg-green-800 text-white font-semibold rounded-md mt-4">অ্যাকাউন্ট তৈরি করুন</button>

             <div className="my-2 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className="btn btn-outline px-2 text-xs"
              onClick={handleGoogleSignIn}
            >
              <span className="font-bold text-base text-[#4285F4]">G</span>
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              className="btn btn-outline px-2 text-xs"
              onClick={handleGithubSignIn}
            >
              <Code2 size={16} />
              GitHub দিয়ে চালিয়ে যান
            </button>
            </div>
             <div className='text-center mt-0.5 text-gray-500 text-sm'><span className='font-semibold text-black'>অ্যাকাউন্ট আছে?</span><Link href='/sign-in' className='underline decoration-green-600 text-green-600'> সাইন ইন করুন</Link></div>
            </fieldset>
            </form>
            <div className='text-center mt-3 text-gray-500 text-sm'><Link href='/'>← হোম পেজে ফিরে যান</Link></div>
        </div>
    );
};

export default SignUpPage;