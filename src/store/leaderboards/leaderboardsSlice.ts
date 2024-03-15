import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import ILeaderboard from '../../types/leaderboards';
import { IUserProfile } from '../../types/user';
import { getErrorMessage, getLeaderboards } from '../../utils/api';

interface IInitialState {
  isLoading:boolean
  data: ILeaderboard<IUserProfile>[]
}

const initialState: IInitialState = {
  isLoading: false,
  data: [],
};

export const asyncReceiveLeaderboards = createAsyncThunk('leaderboards/receive', async (_, { dispatch }) => {
  dispatch(showLoading());
  try {
    const { leaderboards } = await getLeaderboards();
    dispatch(setLeaderboards(leaderboards));
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
  } finally {
    dispatch(hideLoading());
  }
});

const leaderboardsSlice = createSlice({
  name: 'leaderboards',
  initialState,
  reducers: {
    setLeaderboards: (state, action) => { state.data = action.payload; },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncReceiveLeaderboards.pending, (state) => { state.isLoading = true; })
      .addCase(asyncReceiveLeaderboards.fulfilled, (state) => { state.isLoading = false; })
      .addCase(asyncReceiveLeaderboards.rejected, (state) => { state.isLoading = false; });
  },
});

export const { setLeaderboards } = leaderboardsSlice.actions;
export default leaderboardsSlice.reducer;
