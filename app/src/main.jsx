/* eslint-disable no-unused-vars */
import React, { StrictMode } from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import './index.css';
import { UploadProvider } from './components/UploadContext';
import App from './App.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UploadProvider>
      
        <App/>
      
    </UploadProvider>
  </React.StrictMode>
);
