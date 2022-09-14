import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {login, logout, register} from "../services/auth.service";
import {setMessage} from "./message.slice";
import axios, {AxiosError} from "axios";
import IUser, {IUserInfoResponse} from "../user.types";

const user = JSON.parse(localStorage.getItem("user") || "{}");
type ServerError = { errorMessage: string };

export const registerThunk = createAsyncThunk<Promise<IUser>, {username: string, email: string, password: string, role: string[]}>(
    "auth/register",
    async ({ username, email, password, role }, thunkAPI) => {
        try {
            const response = await register(username, email, password, role);
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
    "auth/login",
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

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
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
            state.isLoggedIn = false;
            state.user = action.payload;
        },
    },
});

const { reducer } = authSlice;
export default reducer;