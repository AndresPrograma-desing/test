// Configuraciones del sistema, Ejemplo, enviroments.

export const ENVIROMENTS = {
  dev: {
    mode: 'development',
    port: 5173,
    vite: true,
    baseUrl: 'http://localhost:5173',
    url: 'http://localhost:5173',
  },
  stg: {
    mode: 'staging',
    port: 5174,
    vite: true,
    baseUrl: 'http://localhost:5174',
    url: 'http://localhost:5174',
  },
  pro: {
    mode: 'production',
    port: 5175,
    vite: true,
    baseUrl: 'http://localhost:5175',
    url: 'http://localhost:5175',
  },
};
