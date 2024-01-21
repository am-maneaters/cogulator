import './index.css';

import { Analytics } from '@vercel/analytics/react';
import LogRocket from 'logrocket';
import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

LogRocket.init('fk6gsk/big-brain-town');

const root = createRoot(document.querySelector('#root')!);

root.render(
  <>
    <App />
    <Analytics />
  </>,
);
