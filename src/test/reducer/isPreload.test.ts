import { describe, expect, it } from 'vitest';
import isPreloadReducer, { initialStateIsPreload } from '../../store/isPreload/isPreloadSlice';
/**
* test scenario for isPreload
*
* - isPreload reducer function
*  - should return the initial state when given by unknown action
*
* - isPreload thunk function
*  -
*/

describe('isPreload reducer test', () => {
  it('initialize slice with initialValue', () => {
    // action
    const isPreload = isPreloadReducer(initialStateIsPreload, { type: 'unknown' });

    // assert
    expect(isPreload).toBe(initialStateIsPreload);
  });
});
