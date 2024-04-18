import {
  describe, expect, it, vi,
} from 'vitest';
import { getErrorMessage } from '../../utils/api';
import { asyncPreloadProcess } from '../../store/isPreload/isPreloadSlice';

// Scenario for asyncPreloadProcess
// should preload process correctly
// should handle preload process failure

const mock = vi.hoisted(() => ({
  getOwnProfile: vi.fn(),
  getErrorMessage: vi.fn(),
}));

vi.mock('../../utils/api.ts', async () => ({
  getOwnProfile: mock.getOwnProfile,
  getErrorMessage: mock.getErrorMessage,
}));

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

describe('asyncPreloadProcess', () => {
  it('should preload process correctly', async () => {
    mock.getOwnProfile.mockResolvedValue(fakeUser);

    const dispatch = vi.fn();

    await asyncPreloadProcess()(dispatch, () => {}, undefined);

    expect(dispatch).toHaveBeenNthCalledWith(1, expect.objectContaining({ type: 'isPreload/asyncPreloadProcess/pending' }));
    expect(dispatch).toHaveBeenNthCalledWith(2, expect.objectContaining({ type: 'loading-bar/SHOW' }));
    expect(dispatch).toHaveBeenNthCalledWith(3, expect.objectContaining({ type: 'authUser/setAuthUser' }));
    expect(dispatch).toHaveBeenNthCalledWith(4, expect.objectContaining({ type: 'loading-bar/HIDE' }));
  });

  it('should handle preload process failure', async () => {
    mock.getOwnProfile.mockRejectedValue(new Error('Anda belum login'));

    const dispatch = vi.fn();

    await asyncPreloadProcess()(dispatch, () => {}, undefined);

    expect(dispatch).toHaveBeenNthCalledWith(1, expect.objectContaining({ type: 'isPreload/asyncPreloadProcess/pending' }));
    expect(dispatch).toHaveBeenNthCalledWith(2, expect.objectContaining({ type: 'loading-bar/SHOW' }));
    expect(getErrorMessage).toHaveBeenCalledWith(new Error('Anda belum login'));
    expect(dispatch).toHaveBeenNthCalledWith(3, expect.objectContaining({ type: 'loading-bar/HIDE' }));
  });
});
