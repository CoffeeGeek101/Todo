// import {call,put,all,takeLatest} from 'redux-saga/effects';
// import api, { task } from '../api/api';
// import { creatingTask, taskCreated, taskCreationFailed } from '../redux/CreateTaskSlice';

// const todoapi = new api();

// function* createTask(action : {payload : task}){
//     try{
//         yield put(taskCreated(yield call(todoapi.createTask, action.payload)))
//     }catch(err){
//         yield put(taskCreationFailed());
//     }
// };

// export default function* watcherSaga(){
//     yield all([
//         takeLatest(creatingTask, createTask)
//     ])
// }