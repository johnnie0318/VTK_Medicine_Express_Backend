import axios from 'axios';
import GL_STORE from '../global';
const url = `${GL_STORE.DATA_SERVER_URL}api/studies`;
let headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const getPriors = pbStudy =>
  axios({
    method: 'get',
    headers,
    url: `${url}/${pbStudy}/priors`,
  });
