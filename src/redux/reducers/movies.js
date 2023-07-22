import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    favoriteMovies: [],
    filter: ""
  },
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setFavoriteMovies: (state, action) => {
      state.favoriteMovies = action.payload;
    },
    addFavoriteMovie: (state, action) => {
      state.favoriteMovies = state.favoriteMovies.concat(action.payload);
    },
    removeFavoriteMovie: (state, action) => {
      state.favoriteMovies = state.favoriteMovies.filter(
        (movie) => movie.id !== action.payload.id
      );
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    }
  }
});

export const {
  setMovies,
  setFavoriteMovies,
  addFavoriteMovie,
  removeFavoriteMovie,
  setFilter
} = moviesSlice.actions;

export default moviesSlice.reducer;
