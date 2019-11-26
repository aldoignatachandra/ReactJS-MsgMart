import axios from 'axios';

export const postRegister = (input) => {
  return {
    type: 'POST_REGISTER',
    payload: axios.post ('https://pointofsalesapp.herokuapp.com/api/user/register/',input),
  };
};

export const postLogin = (input) => {
  return {
    type: 'POST_LOGIN',
    payload: axios.post ('https://pointofsalesapp.herokuapp.com/api/user/login/',input),
  };
};