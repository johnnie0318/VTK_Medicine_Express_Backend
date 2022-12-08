export const getToken = () => localStorage.getItem('SavedToken');

export const removeToken = () => localStorage.removeItem('SavedToken');

export const setToken = token => localStorage.setItem('SavedToken', token);
