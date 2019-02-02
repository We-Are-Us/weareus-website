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

// TODO: do this in componentDidMount in App - see https://blog.logrocket.com/data-fetching-in-redux-apps-a-100-correct-approach-4d26e21750fc
store.dispatch(actions.sync());
