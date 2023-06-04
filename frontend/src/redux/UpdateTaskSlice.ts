import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { task } from "../api/api";

interface CreateModalState {
    isUpdating : boolean;
    error : boolean;
}

const initialState : CreateModalState = {
    isUpdating : false,
    error : false,
}

const UpdateTaskSlice = createSlice({
    name : "UpdateTask",
    initialState,
    reducers : {
        updatingTask : (state, action : PayloadAction<task>) => {
            return {
                ...state,
                isUpdating : true,
            }
        },
        updatedTask : (state) => {
            return {
                ...state,
                isUpdating : false,
                error : false,
            }
        },
        updatingTaskFailed : (state) => {
            return {
                ...state,
                isUpdating : false,
                error : true,
            }
        }
    }
});

export const {updatingTask, updatedTask, updatingTaskFailed} = UpdateTaskSlice.actions;
export default UpdateTaskSlice.reducer;