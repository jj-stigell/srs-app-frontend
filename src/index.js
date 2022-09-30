/*import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';
import {
  ApolloClient, ApolloProvider, InMemoryCache, createHttpLink
} from '@apollo/client';
import { Provider } from 'react-redux';
import store from './redux/store';

const link = createHttpLink({
  // eslint-disable-next-line no-undef
  uri: process.env.REACT_APP_DEV_BACKEND_URL,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/

import React from 'react';
import ReactDOM from 'react-dom';

// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {
  ApolloClient, ApolloProvider, InMemoryCache, createHttpLink
} from '@apollo/client';

// project imports
import { store, persister } from './store';
import * as serviceWorker from './serviceWorker';
import App from './App';
import config from './config';
import './i18n';

// style + assets
import './assets/scss/style.scss';

//-----------------------|| INIT APOLLOCLIENT  ||-----------------------//

const link = createHttpLink({
  // eslint-disable-next-line no-undef
  uri: process.env.REACT_APP_DEV_BACKEND_URL,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

//-----------------------|| REACT DOM RENDER  ||-----------------------//

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <PersistGate loading={null} persistor={persister}>
        <BrowserRouter basename={config.basename}>
          <App />
        </BrowserRouter>
      </PersistGate>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
