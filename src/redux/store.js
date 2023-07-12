
import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slice/authSlice";
import reservationReducer from "./slice/reservationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    reservation: reservationReducer,
  },
})

export default store
