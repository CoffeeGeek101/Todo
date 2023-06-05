import React from 'react'
import { task } from '../../api/api';
import { Check, Edit3, Trash } from 'lucide-react';

interface TaskCardProps {
    task: task;
    status ?: string;
    updateModal: (task: task) => void;
    statusChange: (task: task) => void;
    archive: (task: task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, updateModal, statusChange, archive, status }) => {
    return (
        <div className={`${task.status === 'Archived' ? 'bg-slate-400/30 cursor-not-allowed' : ''} w-full h-auto flex flex-col bg-white p-5 rounded-md shadow-sm gap-3 cursor-pointer`}>
            <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row items-center gap-3'>
                    <div className='bg-blue-300/50 text-[10px] md:text-sm font-medium w-[60px] h-[20px] md:w-[80px] md:h-[30px] flex flex-row items-center justify-center rounded-md '>{task.category}</div>
                    <div onClick={()=>updateModal(task)} className='bg-slate-200/50 p-1 rounded-md'><Edit3 size={15} /></div>
                </div>
                <div className='flex flex-row items-center gap-3'>
                    <div
                        onClick={()=>statusChange(task)}
                        className={`bg-green-300/50 text-sm font-medium w-[30px] h-[30px] md:w-[80px] md:h-[30px] flex flex-row items-center justify-center rounded-md ${status === 'Todo' ? 'cursor-pointer' : 'bg-slate-500/20 pointer-events-none cursor-not-allowed'}`}><Check /></div>
                    <div
                        onClick={()=>archive(task)}
                        className={`bg-rose-300/50 text-sm font-medium w-auto h-[30px] p-2 flex flex-row items-center justify-center rounded-md ${status === 'Archived' ? 'bg-slate-500/20 pointer-events-none cursor-not-allowed' : 'cursor-pointer'}`}><Trash size={18} /></div>
                </div>
            </div>
            <div className='flex flex-col justify-start w-full h-auto'>
            <p className='font-semibold'>{task.title}</p>
            <p className='text-sm md:text-base text-gray-500'>{task.description}</p>
            </div>
        </div>
    )
}

export default TaskCard
