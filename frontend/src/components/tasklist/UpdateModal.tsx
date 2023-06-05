import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { closeUpdateModal } from '../../redux/UpdateModalSlice';
import { XSquare } from 'lucide-react';
import { updatingTask } from '../../redux/UpdateTaskSlice';
import { task } from '../../api/api';


const UpdateModal = () => {

  const updateModal = useAppSelector((state) => state.updateModal.isModalOpen);
  const selectedTask = useAppSelector((state) => state.updateModal.task);
  const dispatch = useAppDispatch();

  // console.log(updateModal);
  // console.log(selectedTask);

  const [title, setTitle] = useState(selectedTask?.title);
  const [status, setStatus] = useState(selectedTask?.status);
  const [description, setDescription] = useState(selectedTask?.description);
  const [category, setCategory] = useState(selectedTask?.category);
  const [priority, setPriority] = useState(selectedTask?.priority);
  const [name, setName] = useState(selectedTask?.name);

  useEffect(() => {
    setTitle(selectedTask?.title);
    setStatus(selectedTask?.status);
    setDescription(selectedTask?.description);
    setCategory(selectedTask?.category);
    setPriority(selectedTask?.priority);
    setName(selectedTask?.name);
  },[selectedTask]);

  // console.log(name)

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

  const handleUpdateClose = () => {
    dispatch(closeUpdateModal());
  }

  const updatedTask = {
    title : title,
    status: status,
    description: description,
    category: category,
    priority: priority,
    name: name
  }

  console.log(updatedTask)

  const handleUpdate = (task : task) => {
     dispatch(updatingTask(task));
  }
  
  const handleSubmit = (e : React.FormEvent) => {
      e.preventDefault();
      handleUpdate(updatedTask);
      dispatch(closeUpdateModal());
      setInterval(()=> {
        window.location.reload();
      },3000)
  }

  return (
    <div className={`${updateModal ? '' : 'hidden'} w-full h-screen bg-[#2a2a2a3c]/10 fixed inset-0 backdrop-blur-sm`}>
      <div className='w-full h-full flex flex-row items-center justify-center'>
        <div className='w-full h-auto md:w-[600px] md:h-[500px] bg-white rounded-md shadow-md flex flex-col p-10 items-start gap-3 overflow-y-scroll relative'>
          <XSquare
            onClick={handleUpdateClose}
            size={28} className='absolute top-11 right-10 cursor-pointer' />
          <h1 className='text-2xl font-bold'>Update Task.</h1>
          <form
            onSubmit={handleSubmit}
            className='w-full flex flex-col p-4 gap-6'>
            <div className='flex flex-col md:flex-row gap-5'>

              <input onChange={(e) => setTitle(e.target.value)} placeholder='Title' value={title} className='bg-slate-100 p-3 rounded-md shadow-md focus:outline-none' />
              <div className='relative'>
                <input onClick={() => setStatusOptions(!statusOptions)} placeholder='Status' value={status} readOnly className='bg-slate-100 p-3 rounded-md shadow-md focus:outline-none' />
                <div className={` ${statusOptions ? '' : 'hidden'}   w-[150px] h-auto bg-white flex flex-col shadow-md absolute p-2 items-center  sm:left-[60px] lg:right-0 top-[55px] rounded-md cursor-pointer`}>
                  <p
                    onClick={() => handleStatus('Todo')}
                    className='hover:bg-slate-200/50 w-full text-center p-2 rounded-md'>Todo</p>
                  <p
                    onClick={() => handleStatus('Completed')}
                    className='hover:bg-slate-200/50 w-full text-center p-2 rounded-md'>Completed</p>
                  <p
                    onClick={() => handleStatus('Archived')}
                    className='hover:bg-slate-200/50 w-full text-center p-2 rounded-md'>Archived</p>
                </div>
              </div>
            </div>
            <textarea onChange={(e) => setDescription(e.target.value)} placeholder='Description' value={description} className='bg-slate-100 p-3 rounded-md shadow-md focus:outline-none' />
            <div className='flex flex-col md:flex-row gap-5'>

              <input onChange={(e) => setCategory(e.target.value)} placeholder='Category' value={category} className='bg-slate-100 p-3 rounded-md shadow-md focus:outline-none' />
              <div className='relative'>
                <input onClick={() => setPriorityOptions(!priorityOptions)} placeholder='Priority' value={priority} readOnly className='bg-slate-100 p-3 rounded-md shadow-md focus:outline-none' />
                <div className={` ${priorityOptions ? '' : 'hidden'} w-[150px] h-auto bg-white flex flex-col shadow-md absolute p-2 items-center sm:left-[60px] lg:right-0 top-[55px] rounded-md cursor-pointer`}>
                  <p
                    onClick={() => handlePriority('Low')}
                    className='hover:bg-slate-200/50 w-full text-center p-2 rounded-md'>Low</p>
                  <p
                    onClick={() => handlePriority('Medium')}
                    className='hover:bg-slate-200/50 w-full text-center p-2 rounded-md'>Medium</p>
                  <p
                    onClick={() => handlePriority('High')}
                    className='hover:bg-slate-200/50 w-full text-center p-2 rounded-md'>High</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className='w-full h-[50px] bg-black text-white rounded-md shadow-md'>
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateModal