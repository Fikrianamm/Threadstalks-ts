import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUserProfile, IUserRegisterData } from '../../types/user';
import { getErrorMessage, register } from '../../utils/api';

const initialState: IUserProfile[] = [];

export const asyncRegisterUser = createAsyncThunk('users/register', async (registerData : IUserRegisterData) => {
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
