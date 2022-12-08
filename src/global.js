const GL_STORE = {
  STUDY_ID: 0,
  SERIES_ID: '0',
  IMAGE_NUM: 0,
  IS_CHANGING: false,
  SERIES_INFO: {
    institution: '',
    series_datetime: '',
    series_desc: '',
  },
  STUDY_INFO: {
    pat_name: '',
    pat_id: '',
    study_desc: '',
    pat_sex: '',
    pat_age: '',
  },
  DATA_SERVER_URL: '/proxy/',
  // DATA_SERVER_URL: 'http://localhost:5000/proxy/',
};

export default GL_STORE;
