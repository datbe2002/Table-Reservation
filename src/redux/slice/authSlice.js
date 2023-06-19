import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";
const axiosCus = axios.create({
    baseURL: 'http://localhost:8000/api/',
});


export const login = createAsyncThunk(
    "user/login",
    async (params, thunkAPI) => {
        try {


        } catch (err) {
            // console.log(err);
        }
    }
);

const initialState = {
    userDTO: {},
    msg: "",
    token: null,
    loading: false,
    error: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                // state.userDTO = action.payload.userDTO;
                // state.token = action.payload.token;
            })
    }
})

export const { reducer: authReducer } = authSlice;

export default authReducer;