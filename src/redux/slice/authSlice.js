import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";
const axiosCus = axios.create({
  baseURL: "http://localhost:8000/api/",
});
export const logout = () => {
  return {
    type: "auth/logout",
  };
};

export const login = createAsyncThunk("user/login", async (param, thunkAPI) => {
  try {
    const loginData = param.loginData;
    const navigate = param.navigate;
    const response = await axiosCus.post("customer/login", loginData);
    navigate("/");
    return response.data;
  } catch (error) {
    throw new Error("Invalid email or password");
  }
});

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
  reducers: {
    logoutUser: (state) => {
      state.userDTO = {};
      state.token = null;
    },
  },
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
        state.userDTO = action.payload.customer;
        state.token = action.payload.token;
      })
      .addCase(logout, (state) => {
        state.userDTO = {};
        state.token = null;
      });
  },
});

export const { reducer: authReducer } = authSlice;

export default authReducer;
