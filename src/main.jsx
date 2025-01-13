import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';

import { Provider } from 'react-redux';
import store from './store/store.js';


createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
    <ToastContainer />
  </>
)

/**
 * import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ToastContainer } from 'react-toastify';

import { Provider } from 'react-redux';
import store from './store/store.js';
import { AuthProvider } from './navigatorAuth/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <App />
        <ToastContainer /> 
        </Provider>
        </AuthProvider>
      </StrictMode>
    );
 */
