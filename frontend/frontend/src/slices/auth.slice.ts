import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {login, logout, register} from "../services/auth.service";
import {setMessage} from "./message.slice";

const user = JSON.parse(localStorage.getItem("user") || "{}");


export const loginThunk = createAsyncThunk<Promise<any>, {username: string, password: string}>(
    "auth/login",
    async({username, password}, thunkAPI) => {
        try {
            const data = await login(username, password);
            return {user: data}
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
        [loginThunk.rejected.type]: (state:any, action:PayloadAction) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        [loginThunk.fulfilled.type]: (state:any, actionL:PayloadAction) => {
            state.isLoggedIn = false;
            state.user = null;
        },
    },
});

const { reducer } = authSlice;
export default reducer;