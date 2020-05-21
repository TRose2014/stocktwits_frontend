import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ErrorHandler from './components/ErrorHandler';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <ErrorHandler>
      <App />
    </ErrorHandler>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
