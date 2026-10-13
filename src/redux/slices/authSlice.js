import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulación de autenticación asíncrona para demostración
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Simula latencia de red de 600ms
      await new Promise(resolve => setTimeout(resolve, 600));

      if (email && password) {
        const mockUser = {
          id: 'usr_101',
          name: email.split('@')[0] || 'Usuario Demo',
          email,
          role: 'Admin',
        };
        const mockToken = 'jwt-fake-token-' + Date.now();

        localStorage.setItem('auth_token', mockToken);
        localStorage.setItem('auth_user', JSON.stringify(mockUser));

        return { user: mockUser, token: mockToken };
      }

      return rejectWithValue('Por favor, ingresa credenciales válidas');
    } catch (err) {
      return rejectWithValue(err.message || 'Error al iniciar sesión');
    }
  }
);

const savedToken = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
const savedUser = typeof window !== 'undefined' ? localStorage.getItem('auth_user') : null;

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  token: savedToken || null,
  isAuthenticated: Boolean(savedToken),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('auth_token', action.payload.token);
      localStorage.setItem('auth_user', JSON.stringify(action.payload.user));
    },
    logout: state => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Fallo de autenticación';
      });
  },
});

export const { loginSuccess, logout, clearError } = authSlice.actions;

export const selectAuth = state => state.auth;
export const selectCurrentUser = state => state.auth.user;
export const selectIsAuthenticated = state => state.auth.isAuthenticated;

export default authSlice.reducer;
