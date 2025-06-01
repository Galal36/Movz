// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { IMAGE_BASE_URL } from '../../../api/config';
// import { toggleFavorite } from '../../../services/auth';
//
// const MovieCard = ({ movie, onFavoriteToggle }) => {
//   const [isFavorite, setIsFavorite] = useState(
//     JSON.parse(localStorage.getItem('favoriteMovies') || '[]')
//       .some(fav => fav.id === movie.id)
//   );
//
//   const handleFavoriteClick = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const newFavoriteState = toggleFavorite(movie);
//     setIsFavorite(newFavoriteState);
//     if (onFavoriteToggle) onFavoriteToggle();
//   };
//
//   return (
//     <Link to={`/movie/${movie.id}`} className="movie-card">
//       <img
//         src={movie.poster_path
//           ? `${IMAGE_BASE_URL}${movie.poster_path}`
//           : '/placeholder.jpg'}
//         alt={movie.title}
//       />
//       <button
//         onClick={handleFavoriteClick}
//         className={`heart-icon ${isFavorite ? 'favorited' : ''}`}
//         aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
//       >
//         {isFavorite ? '♥' : '♡'}
//       </button>
//       <div className="movie-info">
//         <h3>{movie.title}</h3>
//         <span className="rating">{movie.vote_average.toFixed(1)}</span>
//       </div>
//     </Link>
//   );
// };
//
// export default MovieCard;


import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../../../api/config';
import { toggleFavorite } from '../../../services/auth';

const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(
    JSON.parse(localStorage.getItem('favoriteMovies') || [])
      .some(fav => fav.id === movie.id)
  );

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(toggleFavorite(movie));
  };

  return (
    // <Link to={`/movie/${movie.id}`} className="movie-card">

<Link to={`/movies/${movie.id}`} className="movie-card">

      <img
        src={movie.poster_path
          ? `${IMAGE_BASE_URL}${movie.poster_path}`
          : '/placeholder.jpg'}
        alt={movie.title}
      />
      <button
        onClick={handleFavoriteClick}
        className={`heart-icon ${isFavorite ? 'favorited' : ''}`}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? '♥' : '♡'}
      </button>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <span className="rating">{movie.vote_average.toFixed(1)}</span>
      </div>
    </Link>
  );
};

export default MovieCard;