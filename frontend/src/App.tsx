import CreateModal from './components/taskcreator/CreateModal'
import Taskcreator from './components/taskcreator/Taskcreator'
import Tasklist from './components/tasklist/Tasklist'
import UpdateModal from './components/tasklist/UpdateModal'
import Topbar from './components/topbar/Topbar'
import './index.css'

function App() {


  return (
    <div className='w-[100vw] h-auto p-10 flex flex-col items-center bg-[#d9dfe0a4] gap-10 relative'>
        <Topbar/>
        <Taskcreator/>
        <CreateModal/>
        <Tasklist/>
        <UpdateModal/>
    </div>
  )
}

export default App
