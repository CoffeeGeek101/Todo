import React from 'react'
import {Check, Trash} from 'lucide-react'

interface StatusbasedListProps {
    status: string
}

const StatusbasedList : React.FC<StatusbasedListProps> = ({status}) => {
  return (
    <div className={`flex flex-col w-[450px] items-center gap-3 ${status === 'Completed' ? 'border-r border-l border-t-0 border-b-0 border-dashed border-[5px] border-black/80' : '' }`}>
        <p className={`w-full h-[50px] flex flex-row items-center justify-center bg-slate-100/80 ${status === 'Todo' ? 'rounded-tl-full rounded-bl-full' : status === 'Archived' ? 'rounded-tr-full rounded-br-full' : '' } shadow-md`}>{status}</p>
        <div className='w-full h-auto flex flex-col p-5 gap-5'>
            <div className='w-full h-auto flex flex-col bg-white p-5 rounded-md shadow-sm gap-3'>
                <div className='flex flex-row justify-between items-center'>
                    <div className='bg-blue-300/50 text-sm font-medium w-[80px] h-[30px] flex flex-row items-center justify-center rounded-md '>General</div>
                    <div className='flex flex-row items-center gap-3'>
                        <div className={`bg-green-300/50 text-sm font-medium w-[80px] h-[30px] flex flex-row items-center justify-center rounded-md ${status === 'Todo' ? 'cursor-pointer' : 'bg-slate-500/20 pointer-events-none cursor-not-allowed'}`}><Check/></div>
                        <div className={`bg-rose-300/50 text-sm font-medium w-auto h-[30px] p-2 flex flex-row items-center justify-center rounded-md ${status === 'Archived' ? 'bg-slate-500/20 pointer-events-none cursor-not-allowed' : 'cursor-pointer'}`}><Trash size={18}/></div>
                    </div>
                </div>
                    <p className='font-semibold'>Watch Bleach and keep on watching</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic ipsum tenetur accusantium facere quas, ipsam autem animi quam! Incidunt, obcaecati reiciendis est consequatur illum neque ipsum debitis aliquam mollitia. Voluptatem!</p>
            </div>
            <div className='w-full h-auto flex flex-col bg-white p-5 rounded-md shadow-sm gap-3'>
                <div className='flex flex-row justify-between items-center'>
                    <div className='bg-blue-300/50 text-sm font-medium w-[80px] h-[30px] flex flex-row items-center justify-center rounded-md '>General</div>
                    <div className='flex flex-row items-center gap-3'>
                        <div className={`bg-green-300/50 text-sm font-medium w-[80px] h-[30px] flex flex-row items-center justify-center rounded-md ${status === 'Todo' ? 'cursor-pointer' : 'bg-slate-500/20 pointer-events-none cursor-not-allowed'}`}><Check/></div>
                        <div className={`bg-rose-300/50 text-sm font-medium w-auto h-[30px] p-2 flex flex-row items-center justify-center rounded-md ${status === 'Archived' ? 'bg-slate-500/20 pointer-events-none cursor-not-allowed' : 'cursor-pointer'}`}><Trash size={18}/></div>
                    </div>
                </div>
                    <p className='font-semibold'>Watch Bleach and keep on watching</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic ipsum tenetur accusantium facere quas, ipsam autem animi quam! Incidunt, obcaecati reiciendis est consequatur illum neque ipsum debitis aliquam mollitia. Voluptatem!</p>
            </div>
        </div>
    </div>
  )
}

export default StatusbasedList