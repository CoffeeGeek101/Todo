import { createSlice } from "@reduxjs/toolkit";

interface CreateModalState {
    isOpen : boolean;
}

const initialState : CreateModalState = {
    isOpen : false
}

const CreateModalSlice = createSlice({
    name : "CreateModal",
    initialState,
    reducers : {
        openModal : (state) => {
            return {
                ...state,
                isOpen : true
            }
        },
        closeModal : (state) => {
            return {
                ...state,
                isOpen : false
            }
        }
    }
});

export const {openModal, closeModal} = CreateModalSlice.actions;
export default CreateModalSlice.reducer;