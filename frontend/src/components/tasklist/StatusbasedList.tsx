import React from 'react'
import { task } from '../../api/api';
import { useAppDispatch } from '../../redux/store';
import { openUpdateModal } from '../../redux/UpdateModalSlice';
import axios from 'axios';
import TaskCard from './TaskCard';

interface StatusbasedListProps {
    status ?: string;
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
        <div className={`flex flex-col w-full md:w-[450px] items-center gap-3 ${status === 'Completed' ? 'lg:border-r lg:border-l lg:border-t-0 lg:border-b-0 lg:border-dashed lg:border-[5px] lg:border-black/80' : ''}`}>
            <p className={`w-full h-[50px] flex flex-row items-center justify-center bg-slate-100/80 ${status === 'Todo' ? 'lg:rounded-tl-full lg:rounded-bl-full' : status === 'Archived' ? 'lg:rounded-tr-full lg:rounded-br-full' : ''} shadow-md`}>{status}</p>
            <div className='w-full h-auto flex flex-col p-5 gap-5'>

                {
                    statusbasedlist.length === 0 ? <p className='text-center text-sm text-slate-500'>No tasks found</p>

                        :
                        statusbasedlist.map((task) => (
                            <>
                                <TaskCard status={status} task={task} archive={handleArchive} statusChange={handleStatusChange} updateModal={handleUpdateModal}/>
                            </>
                        ))
                }
            </div>
        </div>
    )
}

export default StatusbasedList