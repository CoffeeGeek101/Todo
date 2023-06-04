import React from 'react'
import StatusbasedList from './StatusbasedList'
import {motion} from 'framer-motion'

const Tasklist : React.FC = () => {

  return (
    <motion.div 
    initial={{opacity: 0, y: -50}}
    animate={{opacity: 1, y: 0, transition: {duration: 0.5, delay: 1.2, ease: 'easeOut'}}}
    className='w-[100vw] h-auto flex flex-row justify-center'>
        <StatusbasedList status='Todo'/>
        <StatusbasedList status='Completed' />
        <StatusbasedList status='Archived'/>
    </motion.div>
  )
}

export default Tasklist