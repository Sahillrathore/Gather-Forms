import { Coins, Form, LayoutDashboard, List } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Links = [
    // { title: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard /> },
    { title: 'My Forms', path: 'dashboard/', icon: <Form /> },
    { title: 'Responses', path: 'dashboard/responses', icon: <List /> },
    { title: 'Upgrade', path: 'dashboard/pricing', icon: <Coins /> },
]

const Sidebar = () => {
    return (
        <div className='bg-white border border-t-0 border-zinc-200 min-h-screen min-w-62  p-4 px-5'>

            <div className='logo mb-5 flex gap-2 items-center'>
                {/* <img src="" alt="" /> */}
                <div className='w-10 h-10 bg-linear-120 shadow-sm from-blue-300 to-indigo-700 rounded-full'></div>
                <h2 className='font-semibold text-lg '>OpenAI</h2>
            </div>

            <div className='flex flex-col gap-1'>
                {
                    Links.map((link, i) => (
                        <Link href={link.path} key={link.title} className='px-4 py-2 flex gap-2 items-center font-semibold text-sm bg-blue-600 hover:bg-blue-600/90 text-white rounded-md'>
                            {link.icon}
                            <span>{link.title}</span>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Sidebar