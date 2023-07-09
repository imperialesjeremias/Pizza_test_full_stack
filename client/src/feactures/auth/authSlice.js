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
        token: localStorage.getItem("token") || null,
        basicToken: localStorage.getItem("basicToken") || null,
        user: JSON.parse(localStorage.getItem("user")) || null,
        isAuth: localStorage.getItem("isAuth") === "true" ? true : false,
    },
    reducers: {
        setAuthData: (state, action) => {
            
            state.token = action.payload.accessToken;
            state.user = action.payload.user;
            state.isAuth = true;
            const { password, ...userWiwhoutPassword } = action.payload.user;
            localStorage.setItem("token", action.payload.accessToken);
            localStorage.setItem("user", JSON.stringify(userWiwhoutPassword));
            localStorage.setItem("isAuth", "true");
        },
        setAuthBasic: (state, action) => {
            state.basicToken = action.payload.token;
            state.user = action.payload.user;
            state.isAuth = true;

            localStorage.setItem("basicToken", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("isAuth", "true");
        },
        logout: (state) => {
            state.token = "";
            state.user = null;
            state.isAuth = false;

            localStorage.removeItem("token");
            localStorage.removeItem("basicToken");
            localStorage.removeItem("user");
            localStorage.removeItem("isAuth");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                console.log("login", action.payload.user)
                return {
                    ...state,
                    token: action.payload.token,
                    user: action.payload.user,
                    isAuth: true,   
                }
            })
            .addCase(login.rejected, (state, action) => {
                
                return {
                    ...state,
                    token: action.payload.token,
                    user: action.payload.user,
                    isAuth: true,
                }
            })
            .addCase(loginBasic.rejected, (state, action) => {
                state.error = action.error.message;
            })
    },
});

export const { setProfile, setAuthData, setAuthBasic, logout} = authSlice.actions;
export default authSlice.reducer;