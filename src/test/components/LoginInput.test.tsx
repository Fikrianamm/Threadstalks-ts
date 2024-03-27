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
*  - should stay in login page when login failed
*  - should redirect to home page when login success
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

  it('should stay in login page when login failed', async () => {
    // arrange
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    // action
    await userEvent.type(emailInput, 'emailtest@gmail.com');
    await userEvent.type(passwordInput, 'passwordtest');
    await userEvent.click(loginButton);

    // assert
    const loginPage = await screen.getByText('Login');
    expect(loginPage).toBeInTheDocument();
  });

  // it("should redirect to home page when login success", async ()=>{
  //   // arrange
  //   const emailInput = screen.getByPlaceholderText('Email');
  //   const passwordInput = screen.getByPlaceholderText('Password');
  //   const loginButton = screen.getByRole('button', { name: 'Login' });

  //   // action
  //   await userEvent.type(emailInput, 'emailtest@gmail.com');
  //   await userEvent.type(passwordInput, 'passwordtest');
  //   await userEvent.click(loginButton);

  //   // assert
  //   await waitFor(()=>{
  //     expect(screen.)
  //   })
  // })
});
