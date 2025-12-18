import React from 'react'

const DeleteModal = ({ onDelete, setShowDelete }) => {
    return (

        <div className='bg-black/20 w-full h-full absolute top-0 left-0 flex justify-center items-center'>

            <div className="flex flex-col bg-white w-72 h-fit gap-2 rounded-md py-4 px-6 border">
                {/* <h3 className="text-center font-bold text-xl text-gray-800 pb-2">$</h3> */}
                <h3 className="text-lg font-semibold text-gray-900">Delete Field?</h3>
                <p className="text-sm text-gray-500 pb-3">Are you sure you want to delete this item</p>

                <div className="flex justify-around items-center py-3">
                    <div className="flex gap-2 text-gray-600 hover:scale-105 duration-200 hover:cursor-pointer">
                       
                        <button className="font-semibold text-sm text-zinc-700" onClick={() => setShowDelete(false)}>Cancel</button>
                    </div>
                    <div className="flex gap-2 text-gray-600 hover:scale-105 duration-200 hover:cursor-pointer"
                        onClick={onDelete}
                    >
                        <svg className="w-6 stroke-red-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        <button className="font-semibold text-sm text-red-700">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal