import {
  describe, expect, it, vi,
} from 'vitest';
import { getErrorMessage } from '../../utils/api';
import { asyncPopulateThreadsAndUsers } from '../../store/threads/threadsSlice';

// Scenario for asyncPopulateThreadsAndUsers
// should populate threads and users correctly
// should handle populate threads failure
// should handle populate users failure

const mock = vi.hoisted(() => ({
  getAllThreads: vi.fn(),
  getAllUsers: vi.fn(),
  getErrorMessage: vi.fn(),
}));

vi.mock('../../utils/api.ts', async () => ({
  getAllThreads: mock.getAllThreads,
  getAllUsers: mock.getAllUsers,
  getErrorMessage: mock.getErrorMessage,
}));

const fakeThreads = {
  status: 'success',
  message: 'ok',
  data: {
    threads: [{
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-1',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    },
    {
      id: 'thread-2',
      title: 'Thread Kedua',
      body: 'Ini adalah thread kedua',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-2',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    }],
  },
};

const fakeUsers = {
  status: 'success',
  message: 'ok',
  data: {
    users: [
      {
        id: 'john_doe',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      {
        id: 'jane_doe',
        name: 'Jane Doe',
        email: 'jane@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      {
        id: 'fulan',
        name: 'Si Fulan',
        email: 'fulan@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
    ],
  },
};

describe('asyncPopulateThreadsAndUsers', () => {
  it('should populate threads and users correctly', async () => {
    mock.getAllThreads.mockResolvedValue(fakeThreads);
    mock.getAllUsers.mockResolvedValue(fakeUsers);

    const dispatch = vi.fn();

    await asyncPopulateThreadsAndUsers()(dispatch, () => {}, undefined);

    expect(dispatch).toHaveBeenNthCalledWith(1, expect.objectContaining({ type: 'threads/asyncPopulateThreadsAndUsers/pending' }));
    expect(dispatch).toHaveBeenNthCalledWith(2, expect.objectContaining({ type: 'users/setUsers' }));
    expect(dispatch).toHaveBeenNthCalledWith(3, expect.objectContaining({ type: 'threads/setThreads' }));
  });

  it('should handle populate threads failure', async () => {
    mock.getAllThreads.mockRejectedValue(new Error('Failed to fetch threads'));

    const dispatch = vi.fn();

    await asyncPopulateThreadsAndUsers()(dispatch, () => {}, undefined);

    expect(dispatch).toHaveBeenNthCalledWith(1, expect.objectContaining({ type: 'threads/asyncPopulateThreadsAndUsers/pending' }));
    expect(getErrorMessage).toHaveBeenCalledWith(new Error('Failed to fetch threads'));
  });

  it('should handle populate users failure', async () => {
    mock.getAllUsers.mockRejectedValue(new Error('Failed to fetch users'));

    const dispatch = vi.fn();

    await asyncPopulateThreadsAndUsers()(dispatch, () => {}, undefined);

    expect(dispatch).toHaveBeenNthCalledWith(1, expect.objectContaining({ type: 'threads/asyncPopulateThreadsAndUsers/pending' }));
    expect(getErrorMessage).toHaveBeenCalledWith(new Error('Failed to fetch users'));
  });
});
