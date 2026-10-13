import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light';
  const saved = localStorage.getItem('app_theme');
  if (saved === 'dark' || saved === 'light') return saved;
  const prefersDark =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

const initialTheme = getInitialTheme();
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('data-theme', initialTheme);
}

const initialState = {
  mode: initialTheme, // 'light' | 'dark'
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', state.mode);
        localStorage.setItem('app_theme', state.mode);
      }
    },
    setTheme: (state, action) => {
      const mode = action.payload === 'dark' ? 'dark' : 'light';
      state.mode = mode;
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', mode);
        localStorage.setItem('app_theme', mode);
      }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export const selectThemeMode = state => state.theme.mode;
export default themeSlice.reducer;
