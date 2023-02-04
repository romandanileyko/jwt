import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth.slice";
import messageReducer from "./slices/message.slice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const reducer = {
    auth: authReducer,
    message: messageReducer
}

const store = configureStore({
    reducer: reducer,
    devTools: true,
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;