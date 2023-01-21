import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
<<<<<<< HEAD
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
=======

>>>>>>> 6f1b9e54844c04f8729cdf1519ba01dc9e0fd767

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

        <App />

      </PersistGate>
    </Provider>
  </React.StrictMode>
);


<<<<<<< HEAD
=======

>>>>>>> 6f1b9e54844c04f8729cdf1519ba01dc9e0fd767
