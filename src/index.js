import React from 'react';
import ReactDOM from 'react-dom';

// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

//import { PersistGate } from 'redux-persist/integration/react';
import {
  ApolloClient, ApolloProvider, InMemoryCache, createHttpLink
} from '@apollo/client';
import { PersistGate } from 'redux-persist/integration/react';
import { setContext } from '@apollo/client/link/context';

// project imports
import { persistor, store } from './store';
import * as serviceWorker from './serviceWorker';
import App from './App';
import config from './config';
import './i18n';

// style + assets
import './assets/scss/style.scss';

//-----------------------|| INIT APOLLOCLIENT  ||-----------------------//

const httpLink = createHttpLink({
  // eslint-disable-next-line no-undef
  uri: process.env.REACT_APP_DEV_BACKEND_URL,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = window.localStorage.getItem('srs-token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

//-----------------------|| REACT DOM RENDER  ||-----------------------//

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ApolloProvider client={client}>
        <BrowserRouter basename={config.basename}>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
