import {call,put,all,takeLatest} from 'redux-saga/effects';
import api from '../api/api';
import { fetchedTasks, fetchingTasks, fetchingTasksFailed } from '../redux/TaskSlice';
import { updatedTask, updatingTask, updatingTaskFailed } from '../redux/UpdateTaskSlice';


const todoapi = new api();

function* tasksFetcher(){
    try{
        yield put(fetchedTasks(yield call(todoapi.getTasks)))
    }catch(err){
        yield put(fetchingTasksFailed());
    }
}

function* tasksUpdater(action : any){
    try{
        yield put(updatedTask(yield call(todoapi.updateTask, action.payload)))
    }catch(err){
        yield put(updatingTaskFailed());
    }
}

export default function* watcherSaga(){
    yield all([
        takeLatest(fetchingTasks.type, tasksFetcher),
        takeLatest(updatingTask.type, tasksUpdater)
    ]) 
}