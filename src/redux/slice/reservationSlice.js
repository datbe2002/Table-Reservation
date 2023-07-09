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

export const makeReservation = createAsyncThunk(
  "reservation/makeReservation",
  async (params, thunkAPI) => {
    console.log(params);
    try {
      const reservation = params.reservation;
      const _id = params.userID;
      const data = { ...reservation, _id };
      const response = await axiosCus.post("reservation", JSON.stringify(data));
      console.log(response);
      return response.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

const initialState = {
  reservationDTO: {},
  time: {},
  fullReservation: {},
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

      .addCase(makeReservation.pending, (state) => {
        state.loading = true;
      })
      .addCase(makeReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.err;
      })
      .addCase(makeReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.fullReservation = action.payload;
      });
  },
});

export const {
  reducer: reservationReducer,
  actions: { setReservation },
} = reservationSlice;

export default reservationReducer;
