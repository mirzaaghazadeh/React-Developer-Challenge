import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Create modal root for portal challenges
if (!document.getElementById('modal-root')) {
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild(modalRoot);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

