import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    toast.error("Invalid email or password");
    throw new Error("Invalid email or password");
  }
});

export const loginManager = createAsyncThunk(
  "adminManager/login",
  async (param, thunkAPI) => {
    try {
      const loginDataManager = param.loginDataManager;
      const navigate = param.navigate;
      const response = await axiosCus.post("manager/login", loginDataManager);
      navigate("/pageManager");
      return response.data;
    } catch (error) {
      toast.error("Invalid email or password");
      throw new Error("Invalid email or password");
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, thunkAPI) => {
    try {
      const response = await axiosCus.post("customer/forgotpassword", {
        email,
      });
      return response.data;
    } catch (error) {
      toast.error("Failed to send email. Please try again.");
      throw new Error("Failed to send email. Please try again.");
    }
  }
);

export const updatePassword = createAsyncThunk(
    "auth/updatePassword",
    async (resetData, thunkAPI) => {
        const resetToken = resetData.resetToken
      try {
        const response = await axiosCus.put(
          `customer/reset-password/${resetToken}`,
          { password: resetData.password }
        );
        return response.data;
      } catch (error) {
        toast.error("Failed to update password. Please try again.");
        throw new Error("Failed to update password. Please try again.");
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
  reducers: {
    logoutUser: (state) => {
      state.userDTO = {};
      state.token = null;
      state.msg = null;
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
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        // Xử lý phản hồi thành công từ API nếu cần thiết
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
        // Xử lý phản hồi thành công từ API nếu cần thiết
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
const {
  reducer: authReducer,
  actions: { logoutUser },
} = authSlice;

export { logoutUser, authReducer as default };
