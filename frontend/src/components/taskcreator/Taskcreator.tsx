import React from 'react'
import {PlusCircle} from 'lucide-react'
import {motion} from 'framer-motion'
import { useAppDispatch } from '../../redux/store'
import { openModal } from '../../redux/CreateModalSlice'

const Taskcreator : React.FC = () => {

  const dispatch = useAppDispatch();

  const handleOpen = () => {
    dispatch(openModal());
  }

  return (
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1, transition: {duration: 0.5,}}}
    className='w-[70vw] h-[40vh] border-[1px] border-dashed border-black/20 shadow-sm rounded-lg bg-slate-50/50'>
        <div className='w-full h-full flex flex-col p-8 items-center gap-20'>
            <motion.div 
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0, transition: {duration: 0.5, delay: 0.5}}}
            className='flex flex-col items-center gap-2'>
                <h1 className='text-3xl md:text-3xl lg:text-5xl font-extrabold'>Manage your Productivity</h1>
                <p className='text-lg md:text-2xl font-thin tracking-[5px]'>get the most out of your day</p>
            </motion.div>
            <motion.button 
            initial={{opacity: 0}}
            animate={{opacity: 1, transition: {duration: 0.5, delay: 1}}}
            onClick={handleOpen}
            className='w-[180px] h-auto flex flex-row items-center justify-center gap-3 px-5 py-3 bg-zinc-800 rounded-lg shadow-lg text-white font-medium active:scale-95'>
                <PlusCircle size={18}/>
                <p>Create Task</p>
            </motion.button>
        </div>
    </motion.div>
  )
}

export default Taskcreator