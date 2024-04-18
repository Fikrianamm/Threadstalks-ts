import {
  describe, vi, it, expect,
} from 'vitest';
import { asyncSetAuthUser } from '../../store/authUser/authUserSlice';
import { getErrorMessage } from '../../utils/api';

// Scenario for asyncSetAuthUser

// should set authUser state correctly when login success
// should not set authUser state when login failed

// Mock objek untuk fungsi yang dipanggil dalam asyncSetAuthUser
const mocks = vi.hoisted(() => ({
  login: vi.fn(),
  getOwnProfile: vi.fn(),
  putAccessToken: vi.fn(),
  getErrorMessage: vi.fn(),
}));

vi.mock('../../utils/api.ts', async () => ({
  login: mocks.login,
  getOwnProfile: mocks.getOwnProfile,
  putAccessToken: mocks.putAccessToken,
  getErrorMessage: mocks.getErrorMessage,
}));

const fakeLoginResponse = {
  status: 'success',
  message: 'Login success',
  token: '123',
};

const fakeUser = {
  status: 'success',
  message: 'User found',
  user: {
    id: '123',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://example.com/avatar.jpg',
  },
};

describe('asyncSetAuthUser', () => {
  it('should set authUser state correctly when login success', async () => {
    mocks.login.mockResolvedValue(fakeLoginResponse);
    mocks.getOwnProfile.mockResolvedValue(fakeUser);

    const dispatch = vi.fn();

    await asyncSetAuthUser({ email: 'jhone@example.com', password: 'password' })(dispatch, () => {}, undefined);

    expect(dispatch).toHaveBeenNthCalledWith(1, expect.objectContaining({ type: 'authUser/asyncSetAuthUser/pending' }));
    expect(dispatch).toHaveBeenNthCalledWith(2, expect.objectContaining({ type: 'loading-bar/SHOW' }));
    expect(dispatch).toHaveBeenNthCalledWith(3, expect.objectContaining({ type: 'authUser/setAuthUser', payload: fakeUser.user }));
    expect(dispatch).toHaveBeenNthCalledWith(4, expect.objectContaining({ type: 'loading-bar/HIDE' }));
  });

  it('should not set authUser state when login failed', async () => {
    mocks.login.mockRejectedValue(new Error('Login failed'));

    const dispatch = vi.fn();

    await asyncSetAuthUser({ email: 'jhon@example.com', password: 'password' })(dispatch, () => {}, undefined);

    expect(dispatch).toHaveBeenNthCalledWith(1, expect.objectContaining({ type: 'authUser/asyncSetAuthUser/pending' }));
    expect(dispatch).toHaveBeenNthCalledWith(2, expect.objectContaining({ type: 'loading-bar/SHOW' }));
    expect(getErrorMessage).toHaveBeenCalledWith(new Error('Login failed'));
    expect(dispatch).toHaveBeenNthCalledWith(3, expect.objectContaining({ type: 'loading-bar/HIDE' }));
  });
});
