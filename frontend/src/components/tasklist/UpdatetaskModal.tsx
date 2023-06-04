import React from 'react'
import { XSquare } from 'lucide-react'

const UpdatetaskModal = () => {
    return (
        <div className='w-full h-screen bg-black/20 fixed  inset-0 backdrop-blur-sm'>
            <div className='w-full h-full flex flex-row items-center justify-center'>
                <div className='w-[600px] h-[600px] bg-white rounded-md shadow-md flex flex-col p-10 items-center gap-10 overflow-y-scroll relative'>
                    <h2 className='text-2xl font-semibold'>Create your task</h2>
                    <XSquare size={28} className='absolute top-11 right-10 cursor-pointer' />
                    <form className='flex flex-col p-4 gap-6'>
                        <div className='flex flex-row gap-5'>
                            <input placeholder='Title' className='bg-slate-100 p-3 rounded-md shadow-md focus:outline-none' />
                            <input placeholder='Status' className='bg-slate-100 p-3 rounded-md shadow-md focus:outline-none' />
                        </div>
                        <textarea placeholder='Description' className='bg-slate-100 p-3 rounded-md shadow-md focus:outline-none' />
                        <div className='flex flex-row gap-5'>
                            <input placeholder='Title' className='bg-slate-100 p-3 rounded-md shadow-md focus:outline-none' />
                            <input placeholder='Title' className='bg-slate-100 p-3 rounded-md shadow-md focus:outline-none' />
                        </div>
                        
                        <button className='w-full h-[50px] bg-black text-white rounded-md shadow-md'>
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdatetaskModal