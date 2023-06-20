import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";
const axiosCus = axios.create({
  baseURL: "http://localhost:8000/api/",
});

export const getTime = createAsyncThunk(
  "reservation/getTime",
  async (params, thunkAPI) => {
    try {
    } catch (err) {
      // console.log(err);
    }
  }
);

export const getTablePosition = createAsyncThunk(
  "reservation/getTablePosition",
  async (params, thunkAPI) => {
    try {
    } catch (err) {
      // console.log(err);
    }
  }
);

const initialState = {
  reservationDTO: {},
  time: {},
  tablePosition: {},
  msg: "",
  token: null,
  loading: false,
  error: "",
};

export const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    setReservation: (state, action) => {
      state.reservationDTO = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTime.pending, (state) => {
        state.time.loading = true;
      })
      .addCase(getTime.rejected, (state, action) => {
        state.time.loading = false;
        state.time.error = action.error;
      })
      .addCase(getTime.fulfilled, (state, action) => {
        state.time.loading = false;
        //state.time.data = action.payload.data;
      })
      //
      .addCase(getTablePosition.pending, (state) => {
        state.tablePosition.loading = true;
      })
      .addCase(getTablePosition.rejected, (state, action) => {
        state.tablePosition.loading = false;
        state.tablePosition.error = action.error;
      })
      .addCase(getTablePosition.fulfilled, (state, action) => {
        state.tablePosition.loading = false;
        //state.tablePosition.data = action.payload.data
      });
  },
});

export const {
  reducer: reservationReducer,
  actions: { setReservation },
} = reservationSlice;

export default reservationReducer;
