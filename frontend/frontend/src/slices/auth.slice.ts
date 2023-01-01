import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {login,logout, register} from "../services/auth.service";
import {setMessage} from "./message.slice";
import axios, {AxiosError} from "axios";
import IUser, {IUserInfoResponse} from "../user.types";

const user = JSON.parse(localStorage.getItem("user") || "{}");
type ServerError = { errorMessage: string };

export const registerThunk = createAsyncThunk<Promise<IUser>, {name: string, username: string, email: string, password: string, role: string[]}>(
    "auth/registerThunk",
    async ({ name,username, email, password, role }, thunkAPI) => {
        try {
            const response = await register(name,username, email, password, role);
            thunkAPI.dispatch(setMessage(response.data.message));
            return response.data;
        } catch (error) {
            if(axios.isAxiosError(error)) {
                const serverError = error as AxiosError<ServerError>;
                const message  =
                    (serverError.response &&
                        serverError.response.data) ||
                    serverError.message ||
                    serverError.toString();
                thunkAPI.dispatch(setMessage(message.toString()));
                return thunkAPI.rejectWithValue(message);
            }
        }
    }
);

export const loginThunk = createAsyncThunk<IUserInfoResponse, {username: string, password: string}>(
    "auth/loginThunk",
    async({username, password}, thunkAPI) => {
        try {
            const data = await login(username, password);
            return data;
        } catch (error) {
            const message = "Login Error Handle!"
            thunkAPI.dispatch(setMessage(message))
            return  thunkAPI.rejectWithValue(message)
        }
    }
    );

export const logoutThunk = createAsyncThunk<any>(
    "auth/logoutThunk",
    async () => {
    await logout();
    });

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: {
        [loginThunk.rejected.type]: (state:any, action:PayloadAction<IUserInfoResponse>) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        [loginThunk.fulfilled.type]: (state:any, action:PayloadAction<IUserInfoResponse>) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        [registerThunk.fulfilled.type]: (state, action) => {
            state.isLoggedIn = false;
        },
        [registerThunk.rejected.type]: (state, action) => {
            state.isLoggedIn = false;
        },
        [logoutThunk.fulfilled.type]: (state: any, action: any) => {
            state.isLoggedIn = false;
            state.user = null;
        },
    },
});

const { reducer } = authSlice;
export default reducer;