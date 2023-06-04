import React, { useEffect } from 'react'
import StatusbasedList from './StatusbasedList'
import {motion} from 'framer-motion'
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchingTasks } from '../../redux/TaskSlice';

const Tasklist : React.FC = () => {


  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchingTasks());

    return () => {}
  },[dispatch]);

  const tasklist = useAppSelector(state => state.task.tasks);

  // console.log(tasklist)

  return (
    <motion.div 
    initial={{opacity: 0, y: -50}}
    animate={{opacity: 1, y: 0, transition: {duration: 0.5, delay: 1.2, ease: 'easeOut'}}}
    className='w-[100vw] h-auto flex flex-row justify-center'>
        <StatusbasedList status='Todo' tasklist={tasklist}/>
        <StatusbasedList status='Completed' tasklist={tasklist} />
        <StatusbasedList status='Archived' tasklist={tasklist}/>
    </motion.div>
  )
}

export default Tasklist