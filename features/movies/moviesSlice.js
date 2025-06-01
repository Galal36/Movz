import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_KEY } from '../../api/config';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({ language = 'en', search = '', page = 1 } = {}) => {
    const url = search
      ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}&language=${language}&page=${page}`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${language}&page=${page}`;
    const response = await axios.get(url);
    return response.data.results;
  }
);


const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    items: [], // ✅ this MUST exist
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;
