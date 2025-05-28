import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_KEY, BASE_URL, IMAGE_BASE_URL } from '../../../api/config';

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}`
      );
      const data = await response.json();
      setMovies(data.results);
    };
    fetchMovies();
  }, []);

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <Link to={`/movie/${movie.id}`} key={movie.id}>
          <div className="movie-card">
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}