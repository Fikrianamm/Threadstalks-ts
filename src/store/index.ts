import { configureStore } from '@reduxjs/toolkit';
import authUserSlice, { asyncSetAuthUser, asyncUnsetAuthUser } from './authUser/authUserSlice';
import isPreloadSlice, { asyncPreloadProcess } from './isPreload/isPreloadSlice';
import usersSlice, { asyncRegisterUser } from './users/usersSlice';
import threadsSlice, { asyncReceiveThreads } from './threads/threadsSlice';
import themeSlice from './theme/themeSlice';

export const store = configureStore({
  reducer: {
    authUser: authUserSlice,
    isPreload: isPreloadSlice,
    threads: threadsSlice,
    users: usersSlice,
    theme: themeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
  console.log('state:', store.getState());
});
