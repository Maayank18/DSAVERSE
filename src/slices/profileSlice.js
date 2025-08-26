// import {createSlice} from "@reduxjs/toolkit"

// const initialState = {
//     user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
//     loading: false,
// };

// const profileSlice = createSlice({
//     name:"profile",
//     initialState: initialState,
//     reducers: {
//         setUser(state, value) {
//             state.user = value.payload;
//         },
//         setLoading(state, value) {
//             state.loading = value.payload;
//           },
//     },
// });

// export const {setUser, setLoading} = profileSlice.actions;
// export default profileSlice.reducer;


// src/slices/profileSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  loading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      try {
        if (action.payload === null) {
          localStorage.removeItem("user");
        } else {
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
      } catch (e) {
        // ignore localStorage write errors
        // optionally log: console.warn("localStorage write failed", e)
      }
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setUser, setLoading } = profileSlice.actions;
export default profileSlice.reducer;
