import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authUserSlice from './authUser/authUserSlice';
import isPreloadSlice from './isPreload/isPreloadSlice';
import usersSlice from './users/usersSlice';
import threadsSlice from './threads/threadsSlice';
import themeSlice from './theme/themeSlice';

export const store = configureStore({
  reducer: {
    authUser: authUserSlice,
    isPreload: isPreloadSlice,
    threads: threadsSlice,
    users: usersSlice,
    theme: themeSlice,
    loadingBar: loadingBarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
  console.log('state:', store.getState());
});
