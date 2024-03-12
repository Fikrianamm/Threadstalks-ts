import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllThreads, getAllUsers, getErrorMessage } from '../../utils/api';
import { setUsers } from '../users/usersSlice';
import { setReceiveThreads } from '../threads/threadsSlice';

const asyncPopulateThreadsAndUsers = createAsyncThunk('shared/asyncPopulateThreadsAndUsers', async (_, { dispatch }) => {
  try {
    const users = await getAllUsers();
    const threads = await getAllThreads();
    dispatch(setUsers(users.users));
    dispatch(setReceiveThreads(threads.threads));
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }
});

export default asyncPopulateThreadsAndUsers;
