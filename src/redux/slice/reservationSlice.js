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

export const getReservationByUser = createAsyncThunk(
  "reservation/history",
  async (params, thunkAPI) => {
    try {
      const { _id } = params;
      const response = await axiosCus.get(`reservation/${_id}`);
      console.log(response.data);
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
  myReservation: [],
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
      })
      .addCase(getReservationByUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReservationByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.err;
      })
      .addCase(getReservationByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.myReservation = action.payload.allReservations;
        state.message = action.payload.message
        state.error = null;

      });
  },
});

export const {
  reducer: reservationReducer,
  actions: { setReservation },
} = reservationSlice;

export default reservationReducer;
