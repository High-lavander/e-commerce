import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from './store/index.ts';
import './index.scss';
import Redirect from './components/Redirect/Redirect.tsx';
// import client from './sdk/Client';
// client.getProject().then(console.log).catch(console.error);
const store = setupStore();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Redirect />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
