import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import 'tippy.js/dist/tippy.css';
import LogRocket from 'logrocket';
LogRocket.init('fk6gsk/big-brain-town');

const root = createRoot(document.querySelector('#root')!);

root.render(<App />);
