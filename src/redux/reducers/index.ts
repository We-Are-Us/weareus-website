import { combineReducers } from 'redux';
import { reducer as contentful } from './contentful';

export default combineReducers({ contentful });
