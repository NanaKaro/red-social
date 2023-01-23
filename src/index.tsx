import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Sessions from './pages/sessions';
import './styles/index.scss';
import { store, persistor } from './store/store';
import './libs/firebase';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Sessions />} />
            <Route path="home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
