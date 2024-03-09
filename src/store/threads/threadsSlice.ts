import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { IThreadItem } from '../../types/threads';
import { getAllThreads, getErrorMessage } from '../../utils/api';

interface IInitialState {
  status: 'pending' | 'success' | 'fail' | 'idle',
  message: string | null,
  data: IThreadItem[] | null
}

const initialState: IInitialState = {
  status: 'idle',
  message: null,
  data: null,
};

export const asyncReceiveThreads = createAsyncThunk('threads/asyncReceiveThreads', async (_, { dispatch }) => {
  dispatch(showLoading());
  try {
    const { message, threads } = await getAllThreads();
    if (threads) {
      dispatch(hideLoading());
      return threads;
    }
    dispatch(hideLoading());
    throw new Error(message);
  } catch (error) {
    const message = getErrorMessage(error);
    dispatch(hideLoading());
    throw new Error(message);
  }
});

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    setReceiveThreads: (state, action) => { state.data = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncReceiveThreads.pending, (state) => { state.status = 'pending'; })
      .addCase(asyncReceiveThreads.fulfilled, (state, action) => { state.status = 'success'; state.data = action.payload; })
      .addCase(asyncReceiveThreads.rejected, (state) => { state.status = 'fail'; });
  },
});

export const { setReceiveThreads } = threadsSlice.actions;
export default threadsSlice.reducer;
