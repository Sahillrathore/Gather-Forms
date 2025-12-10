import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <header className="flex justify-between items-center bg- p-4 gap-4 h-16 border border-zinc-200">

            <div className='logo'>
                {/* <img src="" alt="" /> */}
                <div className='w-10 h-10 bg-linear-120 shadow-sm from-blue-300 to-indigo-700 rounded-full'></div>
            </div>

            <SignedOut>
                <SignInButton />
                <SignUpButton>
                    <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                        Sign Up
                    </button>
                </SignUpButton>
            </SignedOut>

            <div className='flex items-center gap-4'>
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