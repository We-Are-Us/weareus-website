import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import * as contentful from 'contentful';
import rootReducer from './reducers';
import { makeMiddleware } from './middleware/contentful';
// import { makeSelectors } from 'contentful-redux';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export interface AppState {
  contentful: any;
  nextSyncToken: string;
  homePage: {
    heroImage: string;
    promo: any;
  };
}

// contentful-redux's middleware does not work with the latest Contentful API
const contentfulMiddleware = makeMiddleware({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
  createClient: clientParams =>
    contentful.createClient({
      space: clientParams.space,
      accessToken: clientParams.accessToken
    }),
  stateSelector: state => state.contentful
});

export default createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(thunk, contentfulMiddleware))
);
