import {
  describe, it, expect,
} from 'vitest';
import authUserReducer, {
  setAuthUser, unsetAuthUser, initialStateAuthUser,
} from '../../store/authUser/authUserSlice';
// import { login } from '../utils/api';

/**
* test scenario for authUser
*
* - authUser reducer function
*  - should return the initial state when given by unknown action
*  - should return the authUser correctly when given by setAuthUser action
*  - should return the initial state when given by unsetAuthUser action
*
* - authUser thunk function
*  - should dispatch action correctly when data fetching success
*  - should dispatch action and call alert correctly when data fetching failed
*/

describe('authUser reducer test', () => {
  it('initialize slice with initialValue', () => {
    // action
    const authUser = authUserReducer(initialStateAuthUser, { type: 'unknown' });

    // assert
    expect(authUser).toBe(initialStateAuthUser);
  });

  it('should set auth user correctly', () => {
    // arrange
    const user = {
      id: '123', name: 'John Doe', email: 'john.doe@example.com', avatar: 'avatar.jpg',
    };
    const action = setAuthUser(user);

    // action
    const newState = authUserReducer(initialStateAuthUser, action);

    // assert
    expect(newState).toEqual(user);
  });

  it('should unset auth user correctly', () => {
    // arrange
    const action = unsetAuthUser();

    // action
    const newState = authUserReducer({
      id: '123', name: 'John Doe', email: 'john.doe@example.com', avatar: 'avatar.jpg',
    }, action);

    // assert
    expect(newState).toEqual(initialStateAuthUser);
  });
});

// describe('asyncSetAuthUser thunk test', () => {
//   let originalLogin: typeof login;

//   beforeEach(() => {
//     originalLogin = login;
//   });

//   afterEach(() => {
//     login = originalLogin;
//   });
//   it('dispatches showLoading, setAuthUser, and hideLoading actions', async () => {
//     const loginData = { email: 'carmine@gmail.com', password: 'password' };
//   });
// });
