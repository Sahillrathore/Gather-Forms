import React from 'react'
import LoadingSpinner from '../components/LoadingSpinner';

const FormLoading = () => {

    // const data = []

    return (
        <div className='min-h-screen max-w-7xl mx-auto py-8'>
            <div className='flex justify-between p-0 mb-7'>
                <div className='w-64 h-12 bg-gray-200/80 rounded-md animate-pulse'></div>
                <div className='w-44 h-12 bg-gray-200/80 rounded-md animate-pulse'></div>
            </div>

            <div className="overflow-auto bg-white rounded-xl shadow border">
                <table className="min-w-full border-collapse">
                    <thead className="bg-zinc-100">
                        <tr>
                            <th className="px-4 py-5 text-left text-sm font-medium text-zinc-600">

                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        <tr className="hover:bg-zinc-50">
                            <td className="px-4 py-3 text-sm bg-gray-100 animate-pulse w-full h-8"></td>
                        </tr>
                        <tr className="hover:bg-zinc-50">
                            <td className="px-4 py-3 text-sm bg-gray-50 animate-pulse w-full h-8"></td>
                        </tr>
                        <tr className="hover:bg-zinc-50">
                            <td className="px-4 py-3 text-sm bg-gray-100 animate-pulse w-full h-8"></td>
                        </tr>
                        <tr className="hover:bg-zinc-50">
                            <td className="px-4 py-3 text-sm bg-gray-50 animate-pulse w-full h-8"></td>
                        </tr>
                        <tr className="hover:bg-zinc-50">
                            <td className="px-4 py-3 text-sm bg-gray-100 animate-pulse w-full h-8"></td>
                        </tr>
                        <tr className="hover:bg-zinc-50">
                            <td className="px-4 py-3 text-sm bg-gray-50 animate-pulse w-full h-8"></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className='absolute top-0 right-0 bg-black/10 h-screen  w-full flex flex-col items-center justify-center'>
                <LoadingSpinner />
                <p className='text-sm -mt-6 text-zinc-700'>Loading Responses...</p>
            </div>

        </div>
    )
}

export default FormLoading