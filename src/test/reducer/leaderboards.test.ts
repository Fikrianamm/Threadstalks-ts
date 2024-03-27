import { describe, expect, it } from 'vitest';
import leaderboardsReducer, { initialStateLeaderboards } from '../../store/leaderboards/leaderboardsSlice';

/**
* test scenario for leaderboards
*
* - leaderboards reducer function
*  - should return the initial state when given by unknown action
*
* - leaderboards thunk function
*  -
*/

describe('leaderboards reducer test', () => {
  it('initialize slice with initialValue', () => {
    // action
    const leaderboards = leaderboardsReducer(initialStateLeaderboards, { type: 'unknown' });

    // assert
    expect(leaderboards).toBe(initialStateLeaderboards);
  });
});
