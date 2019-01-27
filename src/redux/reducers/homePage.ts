import { AppState } from '../store';
import { Action } from 'typescript-fsa';
import {
  REQUEST_HOME_PAGE_IMAGE,
  RECEIVE_HOME_PAGE_IMAGE,
  RECEIVE_HOME_PAGE_PROMO,
  REQUEST_HOME_PAGE_PROMO
} from '../actionTypes';

export default (state = {}, action: Action<any>) => {
  console.log('homePage reducers', action.type);

  switch (action.type) {
    case REQUEST_HOME_PAGE_IMAGE:
      return state;
    case RECEIVE_HOME_PAGE_IMAGE:
      const { url } = action.payload;

      return {
        heroImage: url
      };
    case REQUEST_HOME_PAGE_PROMO:
      return state;
    case RECEIVE_HOME_PAGE_PROMO:
      const { promo } = action.payload;

      return {
        ...state,
        homePage: {
          promo
        }
      };
  }

  return state;
};
