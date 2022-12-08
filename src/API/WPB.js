import axios from 'axios';
import GL_STORE from '../global';

const headers = {
  Accept: 'application/json',
  'Access-Control-Allow-Origin': '*',
};
const url = `${GL_STORE.DATA_SERVER_URL}api/wpb-settings`;

export const getWPBSettings = () =>
  axios({
    method: 'get',
    headers,
    url,
  });

export const setWPBSettings = data =>
  axios({
    method: 'put',
    headers,
    url,
    data,
  });
