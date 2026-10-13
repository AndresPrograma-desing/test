import apiClient from './apiClient';

/**
 * Servicio de ejemplo para interactuar con recursos REST
 */
export const exampleService = {
  getPosts: async (limit = 5) => {
    return apiClient.get(`/posts?_limit=${limit}`);
  },

  getPostById: async id => {
    return apiClient.get(`/posts/${id}`);
  },

  createPost: async newPost => {
    return apiClient.post('/posts', newPost);
  },

  deletePost: async id => {
    return apiClient.delete(`/posts/${id}`);
  },
};

export default exampleService;
