import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { IVoteComment, IThreadDetail } from '../../types/threads';
import {
  downVoteComment, getDetailThread, getErrorMessage, neutralVoteComment, upVoteComment,
} from '../../utils/api';

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

export const commentUpVote = createAsyncThunk<void, IVoteComment, {
  state: {
    threadDetail:IInitialState
  }
}>('threadDetail/upVoteComment', async (idContent:IVoteComment, { dispatch, getState }) => {
  dispatch(showLoading());
  const commentBefore = getState().threadDetail;
  dispatch(addVoteUpComment(
    { idComment: idContent.idComment, authUserId: idContent.authUserId },
  ));
  try {
    await upVoteComment(idContent);
  } catch (error) {
    const message = getErrorMessage(error);
    dispatch(setThreadDetail(commentBefore));
    throw new Error(message);
  } finally {
    dispatch(hideLoading());
  }
});

export const commentDownVote = createAsyncThunk<void, IVoteComment, {
  state: {
    threadDetail:IInitialState
  }
}>('threadDetail/downVoteComment', async (idContent:IVoteComment, { dispatch, getState }) => {
  dispatch(showLoading());
  const commentBefore = getState().threadDetail;
  dispatch(addVoteDownComment(
    { idComment: idContent.idComment, authUserId: idContent.authUserId },
  ));
  try {
    await downVoteComment(idContent);
  } catch (error) {
    const message = getErrorMessage(error);
    dispatch(setThreadDetail(commentBefore));
    throw new Error(message);
  } finally {
    dispatch(hideLoading());
  }
});

export const commentNeutralVote = createAsyncThunk<void, IVoteComment, {
  state: {
    threadDetail:IInitialState
  }
}>('threadDetail/neutralVoteComment', async (idContent:IVoteComment, { dispatch, getState }) => {
  dispatch(showLoading());
  const commentBefore = getState().threadDetail;
  dispatch(setVoteNeutralComment(
    { idComment: idContent.idComment, authUserId: idContent.authUserId },
  ));
  try {
    await neutralVoteComment(idContent);
  } catch (error) {
    const message = getErrorMessage(error);
    dispatch(setThreadDetail(commentBefore));
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
    addVoteUpThread: (state, action) => {
      if (state.data !== null) {
        const newData = { ...state.data };
        newData.upVotesBy.push(action.payload.authUserId);
        newData.downVotesBy = newData.downVotesBy.filter(
          (userId) => userId !== action.payload.authUserId,
        );
        state.data = newData;
      }
    },
    addVoteDownThread: (state, action) => {
      if (state.data !== null) {
        const newData = { ...state.data };
        newData.downVotesBy.push(action.payload.authUserId);
        newData.upVotesBy = newData.upVotesBy.filter(
          (userId) => userId !== action.payload.authUserId,
        );
        state.data = newData;
      }
    },
    setVoteNeutralThread: (state, action) => {
      if (state.data !== null) {
        const newData = { ...state.data };
        newData.upVotesBy = newData.upVotesBy.filter(
          (userId) => userId !== action.payload.authUserId,
        );
        newData.downVotesBy = newData.downVotesBy.filter(
          (userId) => userId !== action.payload.authUserId,
        );
        state.data = newData;
      }
    },
    addVoteUpComment: (state, action) => {
      if (state.data !== null) {
        const index = state.data.comments.findIndex(
          (comment) => comment.id === action.payload.idComment,
        );
        const newArrayComments = [...state.data.comments];
        const newComment = { ...state.data.comments[index] };
        newComment.upVotesBy.push(action.payload.authUserId);
        newComment.downVotesBy = newComment.downVotesBy.filter(
          (userId) => userId !== action.payload.authUserId,
        );
        newArrayComments.splice(index, 1, newComment);
        state.data.comments = newArrayComments;
      }
    },
    addVoteDownComment: (state, action) => {
      if (state.data !== null) {
        const index = state.data.comments.findIndex(
          (comment) => comment.id === action.payload.idComment,
        );
        const newArrayComments = [...state.data.comments];
        const newComment = { ...state.data.comments[index] };
        newComment.downVotesBy.push(action.payload.authUserId);
        newComment.upVotesBy = newComment.upVotesBy.filter(
          (userId) => userId !== action.payload.authUserId,
        );
        newArrayComments.splice(index, 1, newComment);
        state.data.comments = newArrayComments;
      }
    },
    setVoteNeutralComment: (state, action) => {
      if (state.data !== null) {
        const index = state.data.comments.findIndex(
          (comment) => comment.id === action.payload.idComment,
        );
        const newArrayComments = [...state.data.comments];
        const newComment = { ...state.data.comments[index] };
        newComment.upVotesBy = newComment.upVotesBy.filter(
          (userId) => userId !== action.payload.authUserId,
        );
        newComment.downVotesBy = newComment.downVotesBy.filter(
          (userId) => userId !== action.payload.authUserId,
        );
        newArrayComments.splice(index, 1, newComment);
        state.data.comments = newArrayComments;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncReceiveThreadDetail.pending, (state) => { state.isLoading = true; })
      .addCase(asyncReceiveThreadDetail.fulfilled, (state) => { state.isLoading = false; })
      .addCase(asyncReceiveThreadDetail.rejected, (state) => { state.isLoading = false; });
  },
});

export const {
  setThreadDetail, unsetThreadDetail, addVoteUpThread, addVoteDownThread, setVoteNeutralThread,
  addVoteUpComment, addVoteDownComment, setVoteNeutralComment,
} = threadDetailSlice.actions;
export default threadDetailSlice.reducer;
