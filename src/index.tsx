import React from 'react';
import ReactDOM from 'react-dom';
import ErrorBoundary from 'react-error-boundary';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import { actions } from './redux/reducers/contentful';

const containerEl = document.getElementById('app');

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>,
  containerEl
);

store.dispatch(actions.sync());
