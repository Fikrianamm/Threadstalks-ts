import { describe, expect, it } from 'vitest';
import usersReducer, { initialStateUsers } from '../../store/users/usersSlice';

/**
* test scenario for users
*
* - users reducer function
*  - should return the initial state when given by unknown action
*
* - users thunk function
*  -
*/

describe('users reducer test', () => {
  it('initialize slice with initialValue', () => {
    // action
    const users = usersReducer(initialStateUsers, { type: 'unknown' });

    // assert
    expect(users).toBe(initialStateUsers);
  });
});
