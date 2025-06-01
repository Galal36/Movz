import { Link, useNavigate } from 'react-router-dom';
import { useFavorites } from './FavoritesContext';

const Navbar = ({ isAuthenticated, setIsAuthenticated, language, setLanguage }) => {
  const navigate = useNavigate();
  const { favorites } = useFavorites();

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/movies" className="navbar-logo">
        Movzz
      </Link>

      <div className="navbar-links">
        <button
          onClick={() => setLanguage('en')}
          className={language === 'en' ? 'active-lang' : ''}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('ar')}
          className={language === 'ar' ? 'active-lang' : ''}
        >
          AR
        </button>

        {isAuthenticated ? (
          <>
            <button onClick={() => navigate('/favorites')} className="favorites-button">
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
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
