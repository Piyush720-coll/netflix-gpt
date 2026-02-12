import { createSlice } from "@reduxjs/toolkit";
import TVShows from "../components/TVShows";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    NowPlayingMovies: null,
    trailerVideo: null,
    PopularMovies: null,
    nowMovies: null,
    TVShows: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.NowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.PopularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.TopRatedMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.UpcomingMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addMovies: (state, action) => {
      state.movies = action.payload; // ✅ store in "movies"
    },
    addTvShows: (state, action) => { // add this
      state.tvShows = action.payload;
    },
    addMyList: (state, action) => { // add this
      state.myList = action.payload;
    },
  },
});

export const { addNowPlayingMovies, addTrailerVideo, addPopularMovies, addTopRatedMovies, addUpcomingMovies, addMovies, addTvShows, addMyList } = moviesSlice.actions;
export default moviesSlice.reducer;