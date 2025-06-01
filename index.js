import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { FavoritesProvider } from './components/FavoritesContext';
import './i18n';

import { Provider } from 'react-redux';
import store from './store'; // Ensure you have store.js in src/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}> {/* 👈 Wrap everything inside Provider */}
    <BrowserRouter>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </BrowserRouter>
  </Provider>
);
