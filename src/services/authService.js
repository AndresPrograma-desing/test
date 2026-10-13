import apiClient from './apiClient';

export const authService = {
  login: async credentials => {
    // Ejemplo de endpoint POST
    return apiClient.post('/auth/login', credentials);
  },

  register: async userData => {
    return apiClient.post('/auth/register', userData);
  },

  getCurrentUser: async () => {
    return apiClient.get('/auth/me');
  },

  logout: async () => {
    return apiClient.post('/auth/logout');
  },
};

export default authService;
