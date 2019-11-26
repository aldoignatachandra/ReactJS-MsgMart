  
import { combineReducers } from 'redux';

import auth from './auth';
import product from './product';
import categories from './categories';
import order from './order';

const appReducer = combineReducers ({
  auth,
  product,
  categories,
  order
});

export default appReducer;