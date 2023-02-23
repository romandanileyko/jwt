import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth.slice";
import messageReducer from "./slices/message.slice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {bookApi} from "./api/book.api";

const reducer = {
    auth: authReducer,
    message: messageReducer,
    [bookApi.reducerPath]: bookApi.reducer
}

const store = configureStore({
    reducer: reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(bookApi.middleware),
    devTools: true,
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;