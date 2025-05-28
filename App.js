import { useState } from 'react';
import { Routes, Route,Navigate } from 'react-router-dom';
import LoginForm from './components/Log_In/LoginForm';
import RegisterForm from './components/Register/RegisterForm';
import MovieList from './components/Movies/MovieList/MovieList';
import MovieDetail from './components/Movies/MovieDetail/MovieDetail';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="app-container">
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<RegisterForm setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/movies" element={isAuthenticated ? <MovieList /> : <Navigate to="/" />} />
        <Route path="/movie/:id" element={isAuthenticated ? <MovieDetail /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;