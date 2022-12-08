export const setStudyId = value => {
  return {
    type: 'SELECT_STUDY',
    id: value,
  };
};

export const setSeriesId = value => {
  return {
    type: 'SELECT_SERIES',
    id: value,
  };
};

export const setImageNum = value => {
  return {
    type: 'SET_IMAGENUM',
    cnt: value,
  };
};

export const setSeriesInfoState = value => {
  return {
    type: 'SET_SERIESINFO',
    info: value,
  };
};

export const setSessionIDAction = sn => {
  return {
    type: 'SET_SESSION_ID',
    sessionID: sn,
  };
};

export const setSelectedStudy = study => {
  return {
    type: 'SET_SESSION_ID',
    study,
  };
};

export const setSelectedFilter = filter => {
  return {
    type: 'SET_SELECTED_FILTER',
    filter,
  };
};

export const setFilters = filters => {
  return {
    type: 'SET_FILTERS',
    filters,
  };
};

export const addFilter = filter => {
  return {
    type: 'ADD_FILTER',
    filter,
  };
};

export const saveLastFilter = name => {
  return {
    type: 'SAVE_LAST_FILTER',
    name,
  };
};

export const deleteFilter = id => {
  return {
    type: 'DELETE_FILTER',
    id,
  };
};

export const addFilterUpdate = (filterID, filter) => ({
  type: 'ADD_FILTER_UPDATE',
  filterID,
  filter,
});

export const setShowFilePreview = status => {
  return {
    type: 'SET_SHOW_FILE_PREVIEW',
    status,
  };
};

export const setPaginationInfo = paginationInfo => {
  return {
    type: 'SET_PAGINATION_INFO',
    paginationInfo,
  };
};

export const setSortDirection = sortBy => {
  return {
    type: 'SET_SORTING_DIRECTION',
    sortBy,
  };
};

export const addQuery = (key, value) => {
  return {
    type: 'ADD_QUERY',
    query: { key, value },
  };
};

export const addQueries = queries => {
  return {
    type: 'ADD_QUERIES',
    queries,
  };
};

export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER',
  };
};

export const makeRefresh = action => {
  return {
    type: 'MAKE_REFRESH',
    action,
  };
};

export const setSelectedRow = study => {
  return {
    type: 'SET_SELECTED_ROW',
    study,
  };
};

export const setSelectedRowMove = study => {
  return {
    type: 'SET_SELECTED_ROW_MOVE',
    study,
  };
};

export const updateSelectedRow = (id, data) => {
  return {
    type: 'UPDATE_SELECTED_ROW',
    data,
    id,
  };
};

export const setSelectedSeries = series => {
  return {
    type: 'SET_SELECTED_SERIES',
    series,
  };
};

export const setStudies = studies => {
  return {
    type: 'SET_STUDIES',
    studies,
  };
};

export const deleteStudy = id => ({
  type: 'DELETE_STUDY',
  id,
});
