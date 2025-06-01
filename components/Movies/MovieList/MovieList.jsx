// src/components/Movies/MovieList/MovieList.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../../../features/movies/moviesSlice';
import MovieCard from './MovieCard';
import { useTranslation } from 'react-i18next';

const MovieList = () => {
  const dispatch = useDispatch();
  const { movies, status, error } = useSelector((state) => state.movies);
  const { i18n } = useTranslation();

  useEffect(() => {
    dispatch(fetchMovies(i18n.language));
  }, [dispatch, i18n.language]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
