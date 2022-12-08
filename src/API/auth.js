import axios from 'axios';
import GL_STORE from '../global';

const url = 'http://lkmt.kometa-pacs.info';

let headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'Cache-Control': 'no-cache',
};

export const logout = () => axios(`${url}/api/auth/logout`, headers);

export const login = ({ username, password }) =>
  axios({
    method: 'post',
    url: GL_STORE.DATA_SERVER_URL + 'api/auth/login',
    data: {
      username,
      password,
    },
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
