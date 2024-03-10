import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import ILeaderboard from '../../types/leaderboards';
import { IUserProfile } from '../../types/user';
import { getErrorMessage, getLeaderboards } from '../../utils/api';

const initialState:ILeaderboard<IUserProfile>[] = [];

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
    setLeaderboards: (_state, action) => action.payload,
  },
});

export const { setLeaderboards } = leaderboardsSlice.actions;
export default leaderboardsSlice.reducer;
