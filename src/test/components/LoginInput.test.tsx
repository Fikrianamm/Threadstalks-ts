import {
  Mock,
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import LoginInput from '../../components/LoginInput';

/**
* test scenario for LoginInput
*
*  - should handle email typing correctly
*  - should handle password typing correctly
*  - should call Login function when login button is clicked
*
*/

expect.extend(matchers);

describe('LoginInput component test', () => {
  let mockLogin:Mock;
  beforeEach(() => {
    mockLogin = vi.fn();
    render(<LoginInput onLogin={mockLogin} />);
  });

  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    // arrange
    const emailInput = screen.getByPlaceholderText('Email');

    // action
    await userEvent.type(emailInput, 'emailtest@gmail.com');

    // assert
    expect(emailInput).toHaveValue('emailtest@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    const passwordInput = screen.getByPlaceholderText('Password');

    // action
    await userEvent.type(passwordInput, 'passwordtest');

    // assert
    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should call Login function when login button is clicked', async () => {
    // arrange
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    // action
    await userEvent.type(emailInput, 'emailtest@gmail.com');
    await userEvent.type(passwordInput, 'passwordtest');
    await userEvent.click(loginButton);

    // assert
    expect(mockLogin).toBeCalledWith({
      email: 'emailtest@gmail.com',
      password: 'passwordtest',
    });
  });
});
