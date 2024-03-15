import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import { IThreadData, IThreadItem } from '../../types/threads';
import {
  createThread, getAllThreads, getAllUsers, getErrorMessage,
} from '../../utils/api';
import { setUsers } from '../users/usersSlice';

interface IInitialState {
  isLoading: boolean
  data: IThreadItem[]
}

const initialState: IInitialState = {
  isLoading: false,
  data: [],
};

export const asyncReceiveThreads = createAsyncThunk('threads/asyncReceiveThreads', async (_, { dispatch }) => {
  dispatch(showLoading());
  try {
    const { message, threads } = await getAllThreads();
    if (threads === undefined) {
      throw new Error(message);
    }
    dispatch(setThreads(threads));
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

export const asyncPopulateThreadsAndUsers = createAsyncThunk('threads/asyncPopulateThreadsAndUsers', async (_, { dispatch }) => {
  try {
    const users = await getAllUsers();
    const threads = await getAllThreads();
    dispatch(setUsers(users.users));
    dispatch(setThreads(threads.threads));
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }
});

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    setThreads: (state, action) => { state.data = action.payload; },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncReceiveThreads.pending, (state) => { state.isLoading = true; })
      .addCase(asyncReceiveThreads.fulfilled, (state) => { state.isLoading = false; })
      .addCase(asyncReceiveThreads.rejected, (state) => { state.isLoading = false; })
      .addCase(asyncPopulateThreadsAndUsers.pending, (state) => { state.isLoading = true; })
      .addCase(asyncPopulateThreadsAndUsers.fulfilled, (state) => { state.isLoading = false; })
      .addCase(asyncPopulateThreadsAndUsers.rejected, (state) => { state.isLoading = false; });
  },
});

export const { setThreads } = threadsSlice.actions;
export default threadsSlice.reducer;
