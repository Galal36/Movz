import { createContext, useContext, useState, useEffect } from 'react';
import { getFavoriteMovies } from '../services/auth';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(getFavoriteMovies());

  const refreshFavorites = () => {
    setFavorites(getFavoriteMovies());
  };

  useEffect(() => {
    const updateFavorites = () => setFavorites(getFavoriteMovies());

    window.addEventListener('favoritesUpdated', updateFavorites);
    return () => window.removeEventListener('favoritesUpdated', updateFavorites);
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites, refreshFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
