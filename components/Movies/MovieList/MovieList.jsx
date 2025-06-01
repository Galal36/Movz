import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../../../features/movies/moviesSlice';
import MovieCard from './MovieCard';

const MovieList = ({ language }) => {
  const dispatch = useDispatch();
  const movies = useSelector(state => state.movies.items);
  const loading = useSelector(state => state.movies.loading);
  const error = useSelector(state => state.movies.error);

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchMovies({ language, page }));
  }, [dispatch, language, page]);

  const filteredMovies = movies?.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNextPage = () => setPage(prev => prev + 1);
  const handlePrevPage = () => setPage(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="movies-page">
      <h2>{language === 'ar' ? 'أفلام مشهورة' : 'Popular Movies'}</h2>

      <input
        type="text"
        placeholder={language === 'ar' ? 'ابحث عن فيلم...' : 'Search for a movie...'}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div className="movie-grid">
        {filteredMovies?.length === 0 ? (
          <p className="no-results">
            {language === 'ar' ? 'لم يتم العثور على نتائج.' : 'No results found.'}
          </p>
        ) : (
          filteredMovies?.map(movie => <MovieCard key={movie.id} movie={movie} />)
        )}
      </div>

      <div className="pagination-controls" style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={handlePrevPage} disabled={page === 1}>
          &lt; {language === 'ar' ? 'السابق' : 'Previous'}
        </button>
        <span style={{ margin: '0 10px' }}>{language === 'ar' ? `الصفحة ${page}` : `Page ${page}`}</span>
        <button onClick={handleNextPage}>
          {language === 'ar' ? 'التالي' : 'Next'} &gt;
        </button>
      </div>
    </div>
  );
};

export default MovieList;
