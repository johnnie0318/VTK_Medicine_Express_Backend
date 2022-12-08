import axios from 'axios';
import GL_STORE from '../global';

const headers = {
  Accept: 'application/json',
  'Access-Control-Allow-Origin': '*',
};
const url = `/api`;

axios.interceptors.request.use(function(config) {
  config.headers.Authorization = `${localStorage.getItem('SavedToken')}`;
  return config;
});

export const getDcmFile = (pbStudy, seriesId, imageNumber) =>
  axios(
    {
      method: 'get',
      url: `${GL_STORE.DATA_SERVER_URL}api/dicom-files/${pbStudy}/${seriesId}/${imageNumber}`,
      data: {},
    },
    headers
  );
