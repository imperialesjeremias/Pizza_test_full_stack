import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {loginJWT, basiclogin} from "../../api/auth";

export const login = createAsyncThunk("auth/login", async (user) => {
    const response = await loginJWT(user);
    return response.data;
});

export const loginBasic = createAsyncThunk("auth/basicLogin", async (user) => {
    const response = await basiclogin(user);
    return response.data;
}
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: localStorage.getItem("token") || null
    }
})