

import { Link, useNavigate } from 'react-router-dom';
import { useFavorites } from './FavoritesContext';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const { favorites } = useFavorites();

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  const viewFavorites = () => {
    navigate('/favorites');
  };

  return (
    <nav className="navbar">
      <Link to="/movies" className="navbar-logo">MovieDB</Link>

      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            <button onClick={viewFavorites} className="favorites-button">
              ♥ Favorites {favorites.length > 0 && (
                <span className="favorites-count">{favorites.length}</span>
              )}
            </button>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;