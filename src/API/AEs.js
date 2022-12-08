import axios from 'axios';
import GL_STORE from '../global';

const url = GL_STORE.DATA_SERVER_URL + 'api/aes';

let headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const getAEs = () => axios(url, headers);
