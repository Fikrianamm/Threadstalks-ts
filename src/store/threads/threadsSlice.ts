import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { IThreadItem } from '../../types/threads';
import { getAllThreads, getErrorMessage } from '../../utils/api';

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

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    setReceiveThreads: (_state, action) => action.payload,
  },
});

export const { setReceiveThreads } = threadsSlice.actions;
export default threadsSlice.reducer;
