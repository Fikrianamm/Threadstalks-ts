import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import { getErrorMessage, getOwnProfile } from '../../utils/api';
import { setAuthUser } from '../authUser/authUserSlice';

const initialState: boolean = true;

export const asyncPreloadProcess = createAsyncThunk('isPreload/asyncPreloadProcess', async (_, { dispatch }) => {
  dispatch(showLoading());
  const preload = toast.loading('Preload process');
  try {
    const { user } = await getOwnProfile();
    if (user === undefined) {
      throw new Error('Anda belum login');
    } else {
      dispatch(setAuthUser(user));
      toast.update(preload, {
        render: 'Anda telah login', type: 'success', isLoading: false, autoClose: 3000,
      });
    }
  } catch (error) {
    const message = getErrorMessage(error);
    toast.update(preload, {
      render: message, type: 'error', isLoading: false, autoClose: 3000,
    });
    throw new Error(message);
  } finally {
    dispatch(hideLoading());
  }
});

const isPreloadSlice = createSlice({
  name: 'isPreload',
  initialState,
  reducers: {
    setIsPreload: (_state, action) => action.payload,
  },
  extraReducers: (builder) => {
    builder.addCase(asyncPreloadProcess.pending, () => true)
      .addCase(asyncPreloadProcess.fulfilled, () => false)
      .addCase(asyncPreloadProcess.rejected, () => false);
  },
});

export const { setIsPreload } = isPreloadSlice.actions;
export default isPreloadSlice.reducer;
