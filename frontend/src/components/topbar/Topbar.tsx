import React from 'react'
import {Search} from 'lucide-react'
import {motion} from 'framer-motion'

const Topbar = () => {
  return (
    <motion.div 
    initial={{opacity: 0, y: -50}}
    animate={{opacity: 1, y: 0, transition: {duration: 0.5, delay: 0.5, ease: 'easeInOut'}}}
    className='w-full h-auto p-5 flex flex-row justify-between items-center'>
        <h2 className='text-4xl font-bold'>Todotracker.</h2>
        <div className='basis-6/12 rounded-md relative border-[1px] border-black/10'>
            <Search className='absolute top-[30%] left-3' size={18}/>
            <input
            placeholder='Search for tasks'
            className='w-full shadow-xl rounded-md bg-slate-100 h-[50px] p-3 px-10 focus: outline-none'/>
        </div>
    </motion.div>
  )
}

export default Topbar