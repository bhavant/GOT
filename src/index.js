import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { GOTContextProvider } from './store/GOT-context';

ReactDOM.render(
  <GOTContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </GOTContextProvider>,
  document.getElementById('root')
);
