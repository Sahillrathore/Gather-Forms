"use client"

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const Header = () => {

    const router = useRouter();
    
    return (
        <header className="flex justify-between items-center bg- p-4 gap-4 h-16 border border-zinc-200">

            <div className='logo' onClick={()=>router.push('/')}>
                <img src="/logo.png" className='w-24' alt="" />
                {/* <div className='w-10 h-10 bg-linear-120 shadow-sm from-blue-300 to-indigo-700 rounded-full cursor-pointer' onClick={()=>router.push('/')}></div> */}
            </div>

            <div className='flex gap-5 items-center'>
                <div className='flex gap-5 '>
                    <Link href='/pricing' className='text-sm text-zinc-600 font-medium hover:text-zinc-800 transition-colors'>Pricing</Link>
                    {/* <Link href='/signup'>Pricing</Link> */}
                </div>

                <SignedOut>
                    {/* <SignInButton /> */}
                    <Link href='/sign-in' className='text-sm text-zinc-600 font-medium hover:text-zinc-800 transition-colors'>Login</Link>
                    <SignUpButton>
                        <button className="bg-blue-600 hover:shadow-lg hover:bg-blue-700/90 transition-all duration-500 text-white rounded-lg font-medium text-sm sm:text-base h-10 sm:h-10 px-4 cursor-pointer">
                            Sign Up
                        </button>
                    </SignUpButton>
                </SignedOut>

                <SignedIn>

                    <div className='py-1.5 bg-blue-500 rounded-md text-white hover:bg-transparent hover:text-blue-500 transition-colors border border-transparent hover:border-blue-500 font-medium'>
                        <Link href="/dashboard" className='px-4'>Dashboard</Link>
                    </div>

                    <UserButton />
                </SignedIn>
            </div>
        </header>
    )
}

export default Header