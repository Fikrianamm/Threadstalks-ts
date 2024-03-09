import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { IUserProfile, IUserRegisterData } from '../../types/user';
import { getErrorMessage, register } from '../../utils/api';

const initialState: IUserProfile[] = [];

export const asyncRegisterUser = createAsyncThunk('users/register', async (registerData : IUserRegisterData, { dispatch }) => {
  dispatch(showLoading());
  try {
    const { message, user } = await register(registerData);
    if (user) {
      return user;
    }
    throw new Error(message);
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }
  dispatch(hideLoading());
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (_state, action) => action.payload,
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
