import { useFavorites } from './FavoritesContext';
import { removeFavorite } from '../services/auth';
import MovieCard from './Movies/MovieList/MovieCard';

const FavoritesPage = () => {
  const { favorites, refreshFavorites } = useFavorites();

  const handleRemoveFavorite = (movieId) => {
    removeFavorite(movieId);
    refreshFavorites(); // Update the state
  };

  return (
    <div className="movies-page">
      <h2>Your Favorite Movies ({favorites.length})</h2>

      {favorites.length === 0 ? (
        <p className="no-results">You haven't added any favorites yet!</p>
      ) : (
        <div className="movie-grid">
          {favorites.map(movie => (
            <div key={movie.id} className="movie-card-wrapper">
              <MovieCard movie={movie} />
              <button
                onClick={() => handleRemoveFavorite(movie.id)}
                className="remove-favorite-btn"
                aria-label={`Remove ${movie.title} from favorites`}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
