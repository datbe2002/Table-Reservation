import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.headers.post["Content-Type"] = "application/json";
const axiosCus = axios.create({
  baseURL: "http://localhost:8000/api/",
});

export const makeReservation = createAsyncThunk(
  "reservation/makeReservation",
  async (params, thunkAPI) => {
    try {
      const reservation = params.reservation;
      const _id = params.userID;
      const data = { ...reservation, _id };
      const response = await axiosCus.post("reservation", JSON.stringify(data));
      // console.log(response);
      return response.data;
    } catch (err) {
      setReservation({});
      toast.warn("There is no availiable table!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      toast.info("Please contact staff to make your reservation!");
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
      // console.log(response.data);
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
  fullReservation: {
    message: null,
    loading: null,
  },
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
        state.fullReservation.loading = true;
      })
      .addCase(makeReservation.rejected, (state, action) => {
        state.fullReservation.loading = false;

        state.fullReservation.message = action.error.message;
      })
      .addCase(makeReservation.fulfilled, (state, action) => {
        state.fullReservation.loading = false;
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
        state.message = action.payload.message;
        state.error = null;
      });
  },
});

export const {
  reducer: reservationReducer,
  actions: { setReservation },
} = reservationSlice;

export default reservationReducer;
