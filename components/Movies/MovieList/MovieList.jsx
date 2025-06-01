import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { API_KEY, BASE_URL, IMAGE_BASE_URL } from '../../../api/config';
import MovieCard from './MovieCard';
import Pagination from './Pagination';
import SearchBar from './SearchBar';

const MovieList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const currentPage = parseInt(searchParams.get('page')) || 1;
  const searchQuery = searchParams.get('query') || '';

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const endpoint = searchQuery ? 'search/movie' : 'movie/popular';
        const url = `${BASE_URL}/${endpoint}?api_key=${API_KEY}&page=${currentPage}${
          searchQuery ? `&query=${encodeURIComponent(searchQuery)}` : ''
        }`;

        const response = await fetch(url);
        const data = await response.json();
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage, searchQuery]);

  const handlePageChange = (page) => {
    searchParams.set('page', page);
    setSearchParams(searchParams);
  };

  const handleSearch = (query) => {
    searchParams.set('query', query);
    searchParams.set('page', 1); // Reset to page 1 on new search
    setSearchParams(searchParams);
  };

  return (
    <div className="movie-list-container">
      <SearchBar
        onSearch={handleSearch}
        initialValue={searchQuery}
      />

      {isLoading ? (
        <div className="loading-spinner">Loading...</div>
      ) : movies.length > 0 ? (
        <>
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="no-results">No movies found</div>
      )}
    </div>
  );
};

export default MovieList;