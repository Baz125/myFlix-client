import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    list: [],
    filter: ""
  },
  reducers: {
    setMovies: (state, action) => {
      state.list = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    }
  }
});

export const { setMovie, setFilter } = moviesSlice.actions;

export default moviesSlice.reducer;
