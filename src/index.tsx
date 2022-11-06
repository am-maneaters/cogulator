import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import 'tippy.js/dist/tippy.css';

const root = createRoot(document.querySelector('#root')!);

root.render(<App />);
