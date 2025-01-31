import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  movies: [],
};
const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
      console.log(action.payload);
    },
  },
});
export let movieReducer = movieSlice.reducer;
export let { setMovies } = movieSlice.actions;
