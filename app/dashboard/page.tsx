"use client"

import React, { useState } from 'react'
import DashboardLayout from './DashboardLayout'
import { Plus } from 'lucide-react'
import AiInputModal from '@/components/AiInputModal';

const Dashboard = () => {

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const handleOpenform = () => {
    setIsFormOpen((prev) => !prev)
  }

  return (
    <DashboardLayout>
      <div className='w-full p-4'>
        <div className='flex justify-between items-center w-full'>
          <h1 className='text-zinc-700 font-semibold text-2xl'>My Forms</h1>

          <button
            className='flex gap-1 px-4 py-2 bg-blue-500 text-white rounded-md font-semibold'
            onClick={handleOpenform}
          >
            <Plus />
            Create New
          </button>
        </div>

        <div>
          {/* <h2 className='text-zinc-600 text-lg font-normal'>Recent Foms</h2> */}
        </div>
      </div>

      { isFormOpen && <AiInputModal setIsFormOpen={setIsFormOpen} />}

    </DashboardLayout>
  )
}

export default Dashboard