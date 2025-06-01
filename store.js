import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './features/movies/moviesSlice'; // Path must be correct

const store = configureStore({
  reducer: {
    movies: moviesReducer, // Make sure this key is `movies`
  },
});

export default store;
