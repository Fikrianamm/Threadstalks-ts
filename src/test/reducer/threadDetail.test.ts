import { describe, expect, it } from 'vitest';
import threadDetailReducer, { initialStateThreadDetail } from '../../store/threadDetail/threadDetailSlice';

/**
* test scenario for threadDetail
*
* - threadDetail reducer function
*  - should return the initial state when given by unknown action
*
* - threadDetail thunk function
*  -
*/

describe('threadDetail reducer test', () => {
  it('initialize slice with initialValue', () => {
    // action
    const threadDetail = threadDetailReducer(initialStateThreadDetail, { type: 'unknown' });

    // assert
    expect(threadDetail).toBe(initialStateThreadDetail);
  });
});
