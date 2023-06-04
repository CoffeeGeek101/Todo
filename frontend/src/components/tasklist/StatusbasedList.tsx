import React from 'react'
import { Check, Edit3, Trash } from 'lucide-react'
import { task } from '../../api/api';
import { useAppDispatch } from '../../redux/store';
import { openUpdateModal } from '../../redux/UpdateModalSlice';
import axios from 'axios';

interface StatusbasedListProps {
    status: string;
    tasklist: task[];
}

const StatusbasedList: React.FC<StatusbasedListProps> = ({ status, tasklist }) => {

    const statusbasedlist = tasklist.filter((task) => task.status === status);

    const dispatch = useAppDispatch();

    const handleUpdateModal = (task: task) => {
        dispatch(openUpdateModal(task));
    }

    const handleStatusChange = async (task: task) => {
        try{
            const res = await axios.put(`http://localhost:8002/api/resource/Actions/${task.name}`, {
                status : status === 'Todo' ? 'Completed' : 'Todo'
            });
            console.log(res.statusText);
            return res.statusText;
        }catch(err){
            console.log(err);
        }
    }

    const handleArchive = async (task: task) => {
        try{
            const res = await axios.put(`http://localhost:8002/api/resource/Actions/${task.name}`, {
                status : 'Archived'
            });
            console.log(res.statusText);
            return res.statusText;
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className={`flex flex-col w-[450px] items-center gap-3 ${status === 'Completed' ? 'border-r border-l border-t-0 border-b-0 border-dashed border-[5px] border-black/80' : ''}`}>
            <p className={`w-full h-[50px] flex flex-row items-center justify-center bg-slate-100/80 ${status === 'Todo' ? 'rounded-tl-full rounded-bl-full' : status === 'Archived' ? 'rounded-tr-full rounded-br-full' : ''} shadow-md`}>{status}</p>
            <div className='w-full h-auto flex flex-col p-5 gap-5'>

                {
                    statusbasedlist.length === 0 ? <p className='text-center text-sm text-slate-500'>No tasks found</p>

                        :
                        statusbasedlist.map((task) => (
                            <>
                                <div className={`${task.status === 'Archived' ? 'bg-slate-400/30 cursor-not-allowed' : ''} w-full h-auto flex flex-col bg-white p-5 rounded-md shadow-sm gap-3 cursor-pointer`}>
                                    <div className='flex flex-row justify-between items-center'>
                                        <div className='flex flex-row items-center gap-3'>
                                            <div className='bg-blue-300/50 text-sm font-medium w-[80px] h-[30px] flex flex-row items-center justify-center rounded-md '>{task.category}</div>
                                            <div onClick={() => handleUpdateModal(task)} className='bg-slate-200/50 p-1 rounded-md'><Edit3 size={17}/></div>
                                        </div>
                                        <div className='flex flex-row items-center gap-3'>
                                            <div
                                            onClick={() => handleStatusChange(task)}
                                            className={`bg-green-300/50 text-sm font-medium w-[80px] h-[30px] flex flex-row items-center justify-center rounded-md ${status === 'Todo' ? 'cursor-pointer' : 'bg-slate-500/20 pointer-events-none cursor-not-allowed'}`}><Check /></div>
                                            <div 
                                            onClick={() => handleArchive(task)}
                                            className={`bg-rose-300/50 text-sm font-medium w-auto h-[30px] p-2 flex flex-row items-center justify-center rounded-md ${status === 'Archived' ? 'bg-slate-500/20 pointer-events-none cursor-not-allowed' : 'cursor-pointer'}`}><Trash size={18} /></div>
                                        </div>
                                    </div>
                                    <p className='font-semibold'>{task.title}</p>
                                    <p>{task.description}</p>
                                </div>
                            </>
                        ))
                }
            </div>
        </div>
    )
}

export default StatusbasedList