import Sidebar from '@/components/Sidebar'
import React, { ReactNode } from 'react'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex w-full h-full bg-white'>
      <Sidebar />
      {children}
    </div>
  )
}

export default DashboardLayout