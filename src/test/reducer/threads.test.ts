import { describe, expect, it } from 'vitest';
import threadsReducer, { initialStateThreads } from '../../store/threads/threadsSlice';

/**
* test scenario for threads
*
* - threads reducer function
*  - should return the initial state when given by unknown action
*
* - threads thunk function
*  -
*/

describe('threads reducer test', () => {
  it('initialize slice with initialValue', () => {
    // action
    const threads = threadsReducer(initialStateThreads, { type: 'unknown' });

    // assert
    expect(threads).toBe(initialStateThreads);
  });
});
