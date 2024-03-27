import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import {
  getErrorMessage, getOwnProfile, login, putAccessToken,
} from '../../utils/api';
import { IUserCredentials } from '../../types/user';

interface IInitialState {
  id: string | null,
  name: string | null,
  email: string | null,
  avatar: string | null,
}

export const initialStateAuthUser : IInitialState = {
  id: null,
  name: null,
  email: null,
  avatar: null,
};

export const asyncSetAuthUser = createAsyncThunk(
  'authUser/asyncSetAuthUser',
  async (loginData: IUserCredentials, { dispatch }) => {
    dispatch(showLoading());
    const loginToast = toast.loading('Login process');
    try {
      const { token } = await login(loginData);
      putAccessToken(token as string);
      const { message, user } = await getOwnProfile();
      if (user === undefined) {
        throw new Error(message);
      }
      toast.update(loginToast, {
        render: 'Login berhasil!', type: 'success', isLoading: false, autoClose: 3000,
      });
      dispatch(setAuthUser(user));
    } catch (error) {
      const message = getErrorMessage(error);
      toast.update(loginToast, {
        render: 'Login gagal!', type: 'error', isLoading: false, autoClose: 3000,
      });
      throw new Error(message);
    } finally {
      dispatch(hideLoading());
    }
  },
);

export const asyncUnsetAuthUser = createAsyncThunk(
  'authUser/asyncUnsetAuthUser',
  async (_, { dispatch }) => {
    dispatch(showLoading());
    try {
      dispatch(unsetAuthUser());
      putAccessToken('');
    } catch (error) {
      const message = getErrorMessage(error);
      throw new Error(message);
    } finally {
      dispatch(hideLoading());
    }
  },
);

const authUserSlice = createSlice({
  name: 'authUser',
  initialState: initialStateAuthUser,
  reducers: {
    setAuthUser: (_state, action) => action.payload,
    unsetAuthUser: () => initialStateAuthUser,
  },
});

export const { setAuthUser, unsetAuthUser } = authUserSlice.actions;
export default authUserSlice.reducer;
