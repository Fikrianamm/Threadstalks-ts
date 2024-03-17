import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import {
  IVoteThread, IThreadData, IThreadDetail, IThreadItem,
} from '../../types/threads';
import {
  createThread,
  downVoteThread,
  getAllThreads,
  getAllUsers,
  getErrorMessage,
  neutralVoteThread,
  upVoteThread,
} from '../../utils/api';
import { setUsers } from '../users/usersSlice';
import {
  addVoteDownThread, addVoteUpThread, setThreadDetail, setVoteNeutralThread,
} from '../threadDetail/threadDetailSlice';

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

export const threadUpVote = createAsyncThunk<void, IVoteThread, { state:{
  threads:IInitialState,
  threadDetail: {
    isLoading: boolean
    data:IThreadDetail | null
  }
} }>('threads/upVote', async (idContent: IVoteThread, { dispatch, getState }) => {
  dispatch(showLoading());
  const threadsBefore = getState().threads;
  const threadDetailBefore = getState().threadDetail;
  dispatch(addVoteUpThread({ idThread: idContent.idThread, authUserId: idContent.authUserId }));
  dispatch(addVoteUp({ idThread: idContent.idThread, authUserId: idContent.authUserId }));
  try {
    await upVoteThread(idContent.idThread);
  } catch (error) {
    const message = getErrorMessage(error);
    dispatch(setThreads(threadsBefore));
    dispatch(setThreadDetail(threadDetailBefore));
    throw new Error(message);
  } finally {
    dispatch(hideLoading());
  }
});

export const threadDownVote = createAsyncThunk<void, IVoteThread, { state:{
  threads:IInitialState,
  threadDetail: {
    isLoading: boolean
    data:IThreadDetail | null
  }
} }>('threads/downVote', async (idContent: IVoteThread, { dispatch, getState }) => {
  dispatch(showLoading());
  const threadsBefore = getState().threads;
  const threadDetailBefore = getState().threadDetail;
  dispatch(addVoteDownThread({ idThread: idContent.idThread, authUserId: idContent.authUserId }));
  dispatch(addVoteDown({ idThread: idContent.idThread, authUserId: idContent.authUserId }));
  try {
    await downVoteThread(idContent.idThread);
  } catch (error) {
    const message = getErrorMessage(error);
    dispatch(setThreads(threadsBefore));
    dispatch(setThreadDetail(threadDetailBefore));
    throw new Error(message);
  } finally {
    dispatch(hideLoading());
  }
});

export const threadNeutralVote = createAsyncThunk<void, IVoteThread, { state:{
  threads:IInitialState,
  threadDetail: {
    isLoading: boolean
    data:IThreadDetail | null
  }
} }>('threads/neutralVote', async (idContent: IVoteThread, { dispatch, getState }) => {
  dispatch(showLoading());
  const threadsBefore = getState().threads;
  const threadDetailBefore = getState().threadDetail;
  dispatch(setVoteNeutralThread(
    { idThread: idContent.idThread, authUserId: idContent.authUserId },
  ));
  dispatch(setVoteNeutral({ idThread: idContent.idThread, authUserId: idContent.authUserId }));
  try {
    await neutralVoteThread(idContent.idThread);
  } catch (error) {
    const message = getErrorMessage(error);
    dispatch(setThreads(threadsBefore));
    dispatch(setThreadDetail(threadDetailBefore));
    throw new Error(message);
  } finally {
    dispatch(hideLoading());
  }
});

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    setThreads: (state, action) => { state.data = action.payload; },
    addVoteUp: (state, action) => {
      const index = state.data.findIndex((thread) => thread.id === action.payload.idThread);
      const newArrayThreads = [...state.data];
      const newThread = { ...state.data[index] };
      newThread.upVotesBy.push(action.payload.authUserId);
      newThread.downVotesBy = newThread.downVotesBy.filter(
        (userId) => userId !== action.payload.authUserId,
      );
      newArrayThreads.splice(index, 1, newThread);
      state.data = newArrayThreads;
    },
    addVoteDown: (state, action) => {
      const index = state.data.findIndex((thread) => thread.id === action.payload.idThread);
      const newArrayThreads = [...state.data];
      const newThread = { ...state.data[index] };
      newThread.downVotesBy.push(action.payload.authUserId);
      newThread.upVotesBy = newThread.upVotesBy.filter(
        (userId) => userId !== action.payload.authUserId,
      );
      newArrayThreads.splice(index, 1, newThread);
      state.data = newArrayThreads;
    },
    setVoteNeutral: (state, action) => {
      const index = state.data.findIndex((thread) => thread.id === action.payload.idThread);
      const newArrayThreads = [...state.data];
      const newThread = { ...state.data[index] };
      newThread.upVotesBy = newThread.upVotesBy.filter(
        (userId) => userId !== action.payload.authUserId,
      );
      newThread.downVotesBy = newThread.downVotesBy.filter(
        (userId) => userId !== action.payload.authUserId,
      );
      newArrayThreads.splice(index, 1, newThread);
      state.data = newArrayThreads;
    },
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

export const {
  setThreads, addVoteUp, addVoteDown, setVoteNeutral,
} = threadsSlice.actions;
export default threadsSlice.reducer;
