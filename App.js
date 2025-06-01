import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/Log_In/LoginForm';
import RegisterForm from './components/Register/RegisterForm';
import MovieList from './components/Movies/MovieList/MovieList';
import MovieDetail from './components/Movies/MovieDetail/MovieDetail';
import Navbar from './components/Navbar';
import FavoritesPage from './components/FavoritesPage';

import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Language toggle state here
  const [language, setLanguage] = useState('en');

  return (
    <>
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        language={language}
        setLanguage={setLanguage}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<RegisterForm setIsAuthenticated={setIsAuthenticated} />} />
        <Route
          path="/movies"
          element={isAuthenticated ? <MovieList language={language} /> : <Navigate to="/login" />}
        />
        <Route
          path="/movies/:id"
          element={isAuthenticated ? <MovieDetail /> : <Navigate to="/login" />}
        />
        <Route
          path="/favorites"
          element={isAuthenticated ? <FavoritesPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
