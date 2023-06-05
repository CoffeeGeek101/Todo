import {CornerDownLeft, Keyboard, Search, X} from 'lucide-react'
import {motion} from 'framer-motion'
import { useState } from 'react';
import api, { task } from '../../api/api';
import axios from 'axios';
import TaskCard from '../tasklist/TaskCard';
import { useAppDispatch } from '../../redux/store';
import { openUpdateModal } from '../../redux/UpdateModalSlice';

const Topbar = () => {

  const [filteredTasks, setFilteredTasks] = useState<task[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchActive, setSearchActive] = useState<boolean>(false);

  const todoapi = new api();

  const handleSearch = async(e: React.FormEvent) => {
    e.preventDefault();
    setSearchActive(true);
    try{
      const res = await axios.get(`http://localhost:8002/api/resource/Actions`,{
        params: {
          fields: JSON.stringify(["title", "description", "priority", "category", "status", "name"]),
          filters : JSON.stringify([['title', 'like', `%${searchTerm}%`]])
        }
      });
      const tasks = res.data.data.map(async (task : task) => {
        const categoryTitle = await todoapi.fetchCategoryTitle(task.category); 
        return {
          ...task,
          category: categoryTitle, 
        };
      });
  
      const resolvedTasks = await Promise.all(tasks);
  
      setFilteredTasks(resolvedTasks);
    }catch(err){
      console.log(err);
    }
  }

  const dispatch = useAppDispatch();

  const handleUpdateModal = (task: task) => {
    dispatch(openUpdateModal(task));
}

const handleStatusChange = async (task: task) => {
    try{
        const res = await axios.put(`http://localhost:8002/api/resource/Actions/${task.name}`, {
            status : task.status === 'Todo' ? 'Completed' : 'Todo'
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

  console.log(filteredTasks);

  return (
    <motion.div 
    initial={{opacity: 0, y: -50}}
    animate={{opacity: 1, y: 0, transition: {duration: 0.5, delay: 0.5, ease: 'easeInOut'}}}
    className='w-full h-auto p-5 flex flex-row justify-between items-center'>
        <h2 className=' text-lg md:text-4xl font-bold'>Todotracker.</h2>
        <form 
        onSubmit={handleSearch}
        className='basis-6/12 rounded-md relative border-[1px] border-black/10'>
            <Search className='absolute top-[30%] left-3' size={18}/>
            <input
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search for tasks'
            className='w-full shadow-xl rounded-md bg-slate-100 h-[40px] md:h-[50px] p-3 px-10 focus: outline-none'/>
            <div className=' hidden absolute bg-slate-400/50 rounded-md py-1 px-2 md:flex flex-row items-center gap-1 right-5 top-[12px]'>
            <CornerDownLeft size={18}/>
            <Keyboard size={15} color='#000000'/>
          </div>
          {
            filteredTasks.length > 0 &&
            <div className={`${searchActive ? '' : 'hidden'} absolute w-screen md:w-[400px] h-[600px] bg-slate-600/50 backdrop-blur-sm shadow-lg overflow-y-scroll p-2 top-20 right-[-63px] md:right-0 rounded-md`}>
              <div 
              onClick={() => setSearchActive(false)}
              className='absolute  bg-black/50 p-2 rounded-md text-white cursor-pointer'><X/></div>
              <div className='w-full h-auto p-5 flex flex-col justify-start gap-5 mt-[30px]'>
                {
                  filteredTasks.map((task: task) => (
                    <TaskCard task={task} status={task.status} archive={handleArchive} statusChange={handleStatusChange} updateModal={handleUpdateModal} />
                  ))
                }
              </div>
            </div>
          }
        </form>
    </motion.div>
  )
}

export default Topbar