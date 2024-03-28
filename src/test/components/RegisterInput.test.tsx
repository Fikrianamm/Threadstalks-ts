import {
  Mock, afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import RegisterInput from '../../components/RegisterInput';

/**
* test scenario for RegisterInput
*
*  - should handle name typing correctly
*  - should handle email typing correctly
*  - should handle password typing correctly
*  - should call Register function when login button is clicked
*
*/

expect.extend(matchers);

describe('RegisterInput component test', () => {
  let mockRegister:Mock;
  beforeEach(() => {
    mockRegister = vi.fn();
    render(<RegisterInput onRegister={mockRegister} />);
  });

  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    // arrange
    const nameInput = screen.getByPlaceholderText('Name');

    // action
    await userEvent.type(nameInput, 'nametest');

    // assert
    expect(nameInput).toHaveValue('nametest');
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

  it('should call Register function when login button is clicked', async () => {
    // arrange
    const nameInput = screen.getByPlaceholderText('Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const registerButton = screen.getByRole('button', { name: 'Register' });

    // action
    await userEvent.type(nameInput, 'nametest');
    await userEvent.type(emailInput, 'emailtest@gmail.com');
    await userEvent.type(passwordInput, 'passwordtest');
    await userEvent.click(registerButton);

    // assert
    expect(mockRegister).toBeCalledWith({
      name: 'nametest',
      email: 'emailtest@gmail.com',
      password: 'passwordtest',
    });
  });
});
