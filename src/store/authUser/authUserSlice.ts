import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getErrorMessage, getOwnProfile, login, putAccessToken,
} from '../../utils/api';
import { IUserProfile, IUserCredentials } from '../../types/user';

interface IInitialState {
  status: 'pending' | 'success' | 'fail' | 'idle',
  message: string | null,
  data: IUserProfile | null
}

const initialState: IInitialState = {
  status: 'idle',
  message: null,
  data: null,
};

export const asyncSetAuthUser = createAsyncThunk(
  'authUser/asyncSetAuthUser',
  async (loginData: IUserCredentials) => {
    try {
      const { token } = await login(loginData);
      putAccessToken(token as string);
      const authUser = await getOwnProfile();
      if (authUser.user) {
        return authUser.user;
      }
      throw new Error(authUser.message);
    } catch (error) {
      const message = getErrorMessage(error);
      throw new Error(message);
    }
  },
);

export const asyncUnsetAuthUser = createAsyncThunk(
  'authUser/asyncUnsetAuthUser',
  async (_, { dispatch }) => {
    try {
      dispatch(unsetAuthUser());
      putAccessToken('');
    } catch (error) {
      const message = getErrorMessage(error);
      throw new Error(message);
    }
  },
);

const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    setAuthUser: (state, action) => { state.data = action.payload; },
    unsetAuthUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncSetAuthUser.pending, (state) => { state.status = 'pending'; })
      .addCase(asyncSetAuthUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.message = 'Login successfully!';
        state.data = {
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          avatar: action.payload.avatar,
        };
      })
      .addCase(asyncSetAuthUser.rejected, (state) => { state.status = 'fail'; })
      .addCase(asyncUnsetAuthUser.pending, (state) => { state.status = 'pending'; })
      .addCase(asyncUnsetAuthUser.fulfilled, (state) => { state.status = 'success'; state.message = 'Logout successfully'; })
      .addCase(asyncUnsetAuthUser.rejected, (state) => { state.status = 'fail'; });
  },
});

export const { setAuthUser, unsetAuthUser } = authUserSlice.actions;
export default authUserSlice.reducer;
