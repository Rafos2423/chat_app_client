import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ConnectionProvider } from './Components/logic/Connection';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConnectionProvider>
        <App />
    </ConnectionProvider>
);
