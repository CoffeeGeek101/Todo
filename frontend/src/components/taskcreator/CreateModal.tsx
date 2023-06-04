import React, { useState } from 'react'
import { XSquare } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { closeModal } from '../../redux/CreateModalSlice';
import { motion } from 'framer-motion';
import api, { task } from '../../api/api';

const CreateModal = () => {

    const modalState = useAppSelector(state => state.createModal.isOpen);
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(closeModal());
    }

    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState('');

    const [statusOptions, setStatusOptions] = useState(false);
    const [priorityOptions, setPriorityOptions] = useState(false);
    
    const handleStatus = (status: string) => {
        setStatus(status);
        setStatusOptions(false);
    }

    const handlePriority = (priority: string) => {
        setPriority(priority);
        setPriorityOptions(false);
    }

    const task = {
        title: title,
        status: status,
        description: description,
        category: category,
        priority: priority
    }

    const todoapi = new api();

    const handleCreateTask = (task : task) => {
        try{
            todoapi.createTask(task);
        }catch(error){
            console.log('error from the component')
        }
    }
    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();
        handleCreateTask(task);
        handleClose();
        setInterval(() => {
            window.location.reload();
        }, 3000);
    }

    return (
        <motion.div
        initial = {{opacity: 0}}
        animate={modalState ? { opacity: 1, transition: { duration: 0.2, delay: 0.2 } } : {}}
        className={`${modalState ? '' : 'hidden'} w-full h-screen bg-black/20 fixed inset-0 backdrop-blur-sm`}>

            <div className='w-full h-full flex flex-row items-center justify-center'>
                <motion.div 
                initial = {{opacity: 0, scale: 0.8}}
                animate={modalState ? { opacity: 1, scale: 1, transition: { duration: 0.2, delay: 0.5, ease:'easeIn' } } : {}}
                className='w-[600px] h-[600px] bg-white rounded-md shadow-md flex flex-col p-10 items-center gap-10 overflow-y-scroll relative'>

                    <h2 className='text-2xl font-semibold'>Create your task</h2>
                    <XSquare
                    onClick={handleClose}
                    size={28} className='absolute top-11 right-10 cursor-pointer' />

                    <form 
                    onSubmit={handleSubmit}
                    className='flex flex-col p-4 gap-6'>
                        <div className='flex flex-row gap-5'>

                            <input onChange={(e)=>setTitle(e.target.value)} placeholder='Title' value={title} className='bg-slate-100 p-3 rounded-md shadow-md focus:outline-none' />
                            <input onClick={()=>setStatusOptions(!statusOptions)} placeholder='Status' value={status} readOnly className='bg-slate-100 p-3 rounded-md shadow-md focus:outline-none' />
                            <div className={` ${statusOptions ? '' : 'hidden'}  w-[150px] h-auto bg-white flex flex-col shadow-md absolute p-2 items-center right-20 top-[180px] rounded-md cursor-pointer`}>
                                <p
                                 onClick={()=>handleStatus('Todo')}
                                 className='hover:bg-slate-200/50 w-full text-center p-2 rounded-md'>Todo</p>
                                <p 
                                onClick={()=>handleStatus('Completed')}
                                className='hover:bg-slate-200/50 w-full text-center p-2 rounded-md'>Completed</p>
                                <p 
                                onClick={()=>handleStatus('Archived')}
                                className='hover:bg-slate-200/50 w-full text-center p-2 rounded-md'>Archived</p>
                            </div>
                        </div>
                        <textarea onChange={(e)=>setDescription(e.target.value)}  placeholder='Description' value={description} className='bg-slate-100 p-3 rounded-md shadow-md focus:outline-none' />
                        <div className='flex flex-row gap-5'>

                            <input onChange={(e)=>setCategory(e.target.value)}  placeholder='Category' value={category} className='bg-slate-100 p-3 rounded-md shadow-md focus:outline-none' />
                            <input onClick={()=>setPriorityOptions(!priorityOptions)} placeholder='Priority' value={priority} readOnly className='bg-slate-100 p-3 rounded-md shadow-md focus:outline-none' />
                            <div className={` ${priorityOptions ? '' : 'hidden'}  w-[150px] h-auto bg-white flex flex-col shadow-md absolute p-2 items-center right-20 top-[350px] rounded-md cursor-pointer`}>
                                <p
                                 onClick={()=>handlePriority('Low')}
                                 className='hover:bg-slate-200/50 w-full text-center p-2 rounded-md'>Low</p>
                                <p 
                                onClick={()=>handlePriority('Medium')}
                                className='hover:bg-slate-200/50 w-full text-center p-2 rounded-md'>Medium</p>
                                <p 
                                onClick={()=>handlePriority('High')}
                                className='hover:bg-slate-200/50 w-full text-center p-2 rounded-md'>High</p>
                            </div>
                        </div>
                        <button 
                        onClick={handleSubmit}
                        className='w-full h-[50px] bg-black text-white rounded-md shadow-md'>
                            Create
                        </button>
                    </form>

                </motion.div>
            </div>
        </motion.div>
    )
}

export default CreateModal