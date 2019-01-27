import { combineReducers } from 'redux';
import { reducer as contentful } from './contentful';
import homePage from './homePage';

export default combineReducers({ contentful, homePage });
