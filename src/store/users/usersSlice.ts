import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import { IUserProfile, IUserRegisterData } from '../../types/user';
import { getErrorMessage, register } from '../../utils/api';

const initialState: IUserProfile[] = [];

export const asyncRegisterUser = createAsyncThunk('users/register', async (registerData : IUserRegisterData, { dispatch }) => {
  dispatch(showLoading());
  const registerToast = toast.loading('Register process');
  try {
    const { message, user } = await register(registerData);
    if (user === undefined) {
      throw new Error(message);
    }
    toast.update(registerToast, {
      render: 'Register berhasil, silahkan Login!', type: 'success', isLoading: false, autoClose: 3000,
    });
  } catch (error) {
    const message = getErrorMessage(error);
    toast.update(registerToast, {
      render: 'Register gagal!', type: 'error', isLoading: false, autoClose: 3000,
    });
    throw new Error(message);
  } finally {
    dispatch(hideLoading());
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
