import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';
import {
  ApolloClient, ApolloProvider, InMemoryCache, createHttpLink
} from '@apollo/client';

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
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
