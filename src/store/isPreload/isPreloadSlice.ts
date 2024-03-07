import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getErrorMessage, getOwnProfile } from '../../utils/api';
import { setAuthUser } from '../authUser/authUserSlice';

const initialState: boolean = true;

export const asyncPreloadProcess = createAsyncThunk('isPreload/asyncPreloadProcess', async (_, { dispatch }) => {
  try {
    const { message, user } = await getOwnProfile();
    if (user) {
      dispatch(setAuthUser(user));
    } else {
      throw new Error(message);
    }
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
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
