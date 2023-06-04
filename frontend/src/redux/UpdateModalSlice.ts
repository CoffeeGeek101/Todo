import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { task } from "../api/api";

interface CreateModalState {
    isModalOpen : boolean;
    task : task;
}

const initialState : CreateModalState = {
    isModalOpen : false,
    task : {},
};

const CreateModalSlice = createSlice({
    name : "CreateModal",
    initialState,
    reducers : {
        openUpdateModal : (state, action : PayloadAction<task>) => {
            return {
                ...state,
                isModalOpen : true,
                task : action.payload
            }
        },
        closeUpdateModal : (state) => {
            return {
                ...state,
                isModalOpen : false,
                task : {}
            }
        }
    }
});

export const {closeUpdateModal,openUpdateModal} = CreateModalSlice.actions;
export default CreateModalSlice.reducer;