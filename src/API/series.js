import axios from 'axios';
import { getToken } from './localstorage';
import GL_STORE from '../global';

const url = '/api/series';

let headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: getToken(),
};

export const getSeries = rowSelected =>
  axios(`${url}?filter[study_id]=${rowSelected}`);

export const getSeriesTags = pbStudy => axios(`${url}/${pbStudy}/dicom-tags`);

export const listSeries = seriesId =>
  axios(
    {
      method: 'get',
      url: `${GL_STORE.DATA_SERVER_URL}api/series/${seriesId}`,
      data: {},
    },
    headers
  );
