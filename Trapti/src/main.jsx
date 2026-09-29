import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HackathonProvider } from './context/HackathonContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <HackathonProvider>
        <App />
      </HackathonProvider>
    </BrowserRouter>
  </React.StrictMode>
);
