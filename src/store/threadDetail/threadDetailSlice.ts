import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { IThreadDetail } from '../../types/threads';
import { getDetailThread, getErrorMessage } from '../../utils/api';

interface IInitialState {
  isLoading: boolean
  data:IThreadDetail | null
}

const initialState: IInitialState = {
  isLoading: false,
  data: null,
};

export const asyncReceiveThreadDetail = createAsyncThunk('threadDetail/asyncReceiveThreadDetail', async (id:string, { dispatch }) => {
  dispatch(showLoading());
  try {
    const { detailThread } = await getDetailThread(id);
    dispatch(setThreadDetail(detailThread));
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
  } finally {
    dispatch(hideLoading());
  }
});

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState,
  reducers: {
    setThreadDetail: (state, action) => { state.data = action.payload; },
    unsetThreadDetail: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(asyncReceiveThreadDetail.pending, (state) => { state.isLoading = true; })
      .addCase(asyncReceiveThreadDetail.fulfilled, (state) => { state.isLoading = false; })
      .addCase(asyncReceiveThreadDetail.rejected, (state) => { state.isLoading = false; });
  },
});

export const { setThreadDetail, unsetThreadDetail } = threadDetailSlice.actions;
export default threadDetailSlice.reducer;
