// Mock database of registered users
export const registeredUsers = [
  {
    email: 'user@example.com',
    password: 'Password123!',
    name: 'Test User',
    username: 'testuser'
  }
];
// let favoriteMovies = [];
//
// export const toggleFavorite = (movie) => {
//   const exists = favoriteMovies.some(fav => fav.id === movie.id);
//   if (exists) {
//     favoriteMovies = favoriteMovies.filter(fav => fav.id !== movie.id);
//   } else {
//     favoriteMovies.push(movie);
//   }
//   localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
//   return !exists;
// };
//
// export const getFavoriteMovies = () => {
//   const stored = localStorage.getItem('favoriteMovies');
//   return stored ? JSON.parse(stored) : [];
// };
//
// // Initialize favorites from localStorage
// favoriteMovies = getFavoriteMovies();
export const authenticateUser = async (email, password) => {
  const user = registeredUsers.find(u =>
    u.email === email && u.password === password
  );
  return !!user;
};

export const isEmailRegistered = async (email) => {
  return registeredUsers.some(u => u.email === email);
};

export const registerUser = async (userData) => {
  if (await isEmailRegistered(userData.email)) {
    throw new Error('Email already registered');
  }
  registeredUsers.push(userData);
  return true;
};

// Add these to your existing auth.js
let favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];

export const toggleFavorite = (movie) => {
  const index = favoriteMovies.findIndex(fav => fav.id === movie.id);
  const isNowFavorite = index === -1;

  if (isNowFavorite) {
    favoriteMovies.push(movie);
  } else {
    favoriteMovies.splice(index, 1);
  }

  localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));

  // Dispatch event for real-time updates
  window.dispatchEvent(new Event('favoritesUpdated'));

  return isNowFavorite;
};

export const getFavoriteMovies = () => {
  return [...favoriteMovies]; // Return copy to prevent direct modification
};

export const removeFavorite = (movieId) => {
  favoriteMovies = favoriteMovies.filter(movie => movie.id !== movieId);
  localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
  window.dispatchEvent(new Event('favoritesUpdated'));
};