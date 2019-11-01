import axios from 'axios';

export const postRegister = (input) => {
  return {
    type: 'POST_REGISTER',
    payload: axios.post ('http://localhost:4000/api/user/register/',input),
  };
};

export const postLogin = (input) => {
  return {
    type: 'POST_LOGIN',
    payload: axios.post ('http://localhost:4000/api/user/login/',input),
  };
};