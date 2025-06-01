import { useState, useEffect } from 'react';
import { getFavoriteMovies } from '../services/auth';

const FavoriteIcon = ({ onClick, count }) => {
  return (
    <button
      onClick={onClick}
      className="favorite-icon"
      aria-label={`View favorites (${count})`}
    >
      ♥ {count > 0 && <span className="badge">{count}</span>}
    </button>
  );
};

export default FavoriteIcon;