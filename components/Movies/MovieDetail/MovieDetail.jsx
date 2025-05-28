import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_KEY, BASE_URL, IMAGE_BASE_URL } from '../../../api/config';

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(
        `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
      );
      const data = await response.json();
      setMovie(data);
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-detail">
      <img
        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
        alt={movie.title}
      />
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p>Rating: {movie.vote_average}/10</p>
      <p>Release Date: {movie.release_date}</p>
    </div>
  );
}