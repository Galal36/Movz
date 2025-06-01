import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { FavoritesProvider } from './components/FavoritesContext';
import { Provider } from 'react-redux'; // ✅ Add this
import store from './store'; // ✅ Ensure you have a store.js file like I gave you

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}> {/* ✅ Wrap everything in Redux provider */}
    <BrowserRouter>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </BrowserRouter>
  </Provider>
);
