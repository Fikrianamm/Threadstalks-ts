import { createSlice } from '@reduxjs/toolkit';

type ThemeType = 'dark' | 'light';

const initialState:ThemeType = 'dark';

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
