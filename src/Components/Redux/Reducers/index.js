  
import { combineReducers } from 'redux';

import auth from './auth';
import product from './product';
import categories from './categories';

const appReducer = combineReducers ({
  auth,
  product,
  categories
});

export default appReducer;