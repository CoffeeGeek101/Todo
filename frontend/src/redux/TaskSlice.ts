import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { task } from "../api/api";

interface TaskState {
    isFetching : boolean;
    tasks : task[];
    error : boolean;
}

const initialState : TaskState = {
    isFetching : false,
    tasks : [],
    error : false
}

const TaskSlice = createSlice({
    name : "Task",
    initialState,
    reducers : {
        fetchingTasks : (state) => {
            return {
                ...state,
                isFetching : true,
            }
        },
        fetchedTasks : (state, action : PayloadAction<task[]>) => {
            return {
                ...state,
                isFetching : false,
                tasks : [...action.payload],
                error : false
            }
        },
        fetchingTasksFailed : (state) => {
            return {
                ...state,
                isFetching : false,
                error : true,
            }
        }
    }
});

export const {fetchingTasks, fetchedTasks, fetchingTasksFailed} = TaskSlice.actions;
export default TaskSlice.reducer;