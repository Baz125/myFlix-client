import { createSlice } from "@reduxjs/toolkit";
const storedToken = localStorage.getItem("token");

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: storedToken,
    user: {}
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      localStorage.setItem("token", action.payload);
      state.token = action.payload;
    }
  }
});

export const { setUser, setToken } = userSlice.actions;

export default userSlice.reducer;
