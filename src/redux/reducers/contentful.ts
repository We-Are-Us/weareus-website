import { createClient } from 'contentful';
// FIXME: write types
import contentfulRedux from 'contentful-redux';
import { AppState } from '../store';

export const { actions, reducer, middleware, selectors } = contentfulRedux({
  createClient,
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  stateSelector: (state: AppState) => state.contentful
});
