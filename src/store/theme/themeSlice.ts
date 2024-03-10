import { createSlice } from '@reduxjs/toolkit';

type ThemeType = 'dark' | 'light';

function getTheme() {
  return localStorage.getItem('theme');
}

const initialState:ThemeType = getTheme() as ThemeType || 'dark';

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (_state, action) => {
      localStorage.setItem('theme', action.payload);
      return action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
