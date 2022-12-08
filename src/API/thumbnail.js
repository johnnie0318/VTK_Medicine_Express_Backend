import GL_STORE from '../global';
const url = GL_STORE.DATA_SERVER_URL + 'api/images/thumbnails';

export const getThumbnail = series =>
  fetch(`${url}/${series}`, {
    headers: {
      Authorization: `${localStorage.getItem('SavedToken')}`,
    },
  });
