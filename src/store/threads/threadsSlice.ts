import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import { IThreadData, IThreadItem } from '../../types/threads';
import { createThread, getAllThreads, getErrorMessage } from '../../utils/api';

const initialState: IThreadItem[] = [];

export const asyncReceiveThreads = createAsyncThunk('threads/asyncReceiveThreads', async (_, { dispatch }) => {
  dispatch(showLoading());
  try {
    const { message, threads } = await getAllThreads();
    if (threads === undefined) {
      throw new Error(message);
    }
    dispatch(setReceiveThreads(threads));
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
  } finally {
    dispatch(hideLoading());
  }
});

export const asyncCreateThread = createAsyncThunk('threads/asyncCreateThread', async (createThreadData: IThreadData, { dispatch }) => {
  dispatch(showLoading());
  const createToast = toast.loading('Create process');
  try {
    const { status, message } = await createThread(createThreadData);
    if (status !== 'success') {
      throw new Error(message);
    }
    toast.update(createToast, {
      render: 'Create thread berhasil!', type: 'success', isLoading: false, autoClose: 3000,
    });
  } catch (error) {
    const message = getErrorMessage(error);
    toast.update(createToast, {
      render: 'Create thread gagal!', type: 'error', isLoading: false, autoClose: 3000,
    });
    throw new Error(message);
  } finally {
    dispatch(hideLoading());
  }
});

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    setReceiveThreads: (_state, action) => action.payload,
  },
});

export const { setReceiveThreads } = threadsSlice.actions;
export default threadsSlice.reducer;
