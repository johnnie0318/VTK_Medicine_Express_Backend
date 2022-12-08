import GL_STORE from '../../global';

const scheme = 'wadouri';
const base = '/cornerstone/studies';
const seriesNumber = 0;

const ROOT_URL =
  window.location.hostname === 'localhost'
    ? window.location.host
    : window.location.hostname;
//const HOST_URL = 'localhost:5000';
const HOST_URL = 'react.kometa-pacs.info';

export default function(imageId) {
  const pbStudy = GL_STORE.STUDY_ID;
  const seriesId = GL_STORE.SERIES_ID;
  // return `dicomweb://${ROOT_URL}/api/dicom-files/${pbStudy}/${seriesId}/${imageId}`;
  return `dicomweb://${HOST_URL}${GL_STORE.DATA_SERVER_URL}api/dicom-files/${pbStudy}/${seriesId}/${imageId}`;

  // return `myCustomLoader://${ROOT_URL}/api/dicom-files/${pbStudy}/${seriesId}/${imageId}`;
}
