import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import createModalReducer from "./CreateModalSlice";
import UpdateModalReducer from "./UpdateModalSlice";
import taskReducer from "./TaskSlice";
import taskupdateReducer from "./UpdateTaskSlice";
import watcherSaga from "../saga/sagaIndex";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    createModal: createModalReducer,
    task: taskReducer,
    updateModal: UpdateModalReducer,
    updateTask: taskupdateReducer,
  },
  middleware: (getDeafaultMiddleware) => {
    return getDeafaultMiddleware({ thunk: false }).prepend(sagaMiddleware);
  },
});

sagaMiddleware.run(watcherSaga);

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;

export default store;
