import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor de Solicitud (Request): inyecta token Bearer si existe
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Interceptor de Respuesta (Response): manejo centralizado de respuestas y errores
apiClient.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    const { response } = error;

    if (response) {
      // Manejo de token expirado o no autorizado
      if (response.status === 401) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        // Opcional: redirigir a login o disparar evento
        // window.location.href = '/login';
      }

      const errorMessage =
        response.data?.message ||
        response.data?.error ||
        `Error ${response.status}: ${response.statusText}`;
      return Promise.reject(new Error(errorMessage));
    }

    if (error.request) {
      return Promise.reject(
        new Error('No se pudo conectar con el servidor. Verifica tu conexión a internet.')
      );
    }

    return Promise.reject(error);
  }
);

export default apiClient;
