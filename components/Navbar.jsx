// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useFavorites } from './FavoritesContext';
import { useTranslation } from 'react-i18next';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="navbar">
      <Link to="/movies" className="navbar-logo">
        {t('welcome')}
      </Link>

      <div className="navbar-links">
        <button onClick={() => changeLanguage('en')}>EN</button>
        <button onClick={() => changeLanguage('ar')}>AR</button>

        {isAuthenticated ? (
          <>
            <button onClick={() => navigate('/favorites')} className="favorites-button">
              ♥ {t('favorites')} {favorites.length > 0 && (
                <span className="favorites-count">{favorites.length}</span>
              )}
            </button>
            <button onClick={handleLogout} className="logout-btn">
              {t('logout')}
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">{t('login')}</Link>
            <Link to="/register" className="navbar-link">{t('register')}</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
