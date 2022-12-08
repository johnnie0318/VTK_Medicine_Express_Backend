const initialState = {
  studyId: 0,
  seriesId: 0,
  imageNum: 0,
  seriesInfo: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_STUDY':
      return Object.assign({}, state, {
        studyId: action.id,
      });
    case 'SELECT_SERIES':
      return Object.assign({}, state, {
        seriesId: action.id,
      });
    case 'SET_IMAGENUM':
      return Object.assign({}, state, {
        imageNum: action.cnt,
      });
    case 'SER_SERIESINFO':
      return Object.assign({}, state, {
        seriesInfo: action.info,
      });
    default:
      return state;
  }
};

export default reducer;
