import React from 'react';
import ReactDOMClient from 'react-dom/client';
import App from './src/app';

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(<App />);
