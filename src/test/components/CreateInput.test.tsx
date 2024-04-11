import {
  Mock, afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import CreateInput from '../../components/CreateInput';

/**
  * test scenario for CreateInput
  *
  *  - should handle title typing correctly
  *  - should handle category typing correctly
  *  - should handle body typing correctly
  *  - should call createThread function when create button is clicked
  *
  */

expect.extend(matchers);

describe('CreateInput component test', () => {
  let mockRegister:Mock;
  beforeEach(() => {
    mockRegister = vi.fn();
    render(<CreateInput onCreate={mockRegister} />);
  });

  afterEach(() => {
    cleanup();
  });

  it('should handle title typing correctly', async () => {
    // arrange
    const titleInput = screen.getByPlaceholderText('Title');

    // action
    await userEvent.type(titleInput, 'titletest');

    // assert
    expect(titleInput).toHaveValue('titletest');
  });

  it('should handle category typing correctly', async () => {
    // arrange
    const categoryInput = screen.getByPlaceholderText('Category (opsional)');

    // action
    await userEvent.type(categoryInput, 'categorytest');

    // assert
    expect(categoryInput).toHaveValue('categorytest');
  });

  it('should handle body typing correctly', async () => {
    // arrange
    const bodyInput = screen.getByPlaceholderText('Description...');

    // action
    await userEvent.type(bodyInput, 'bodytest');

    // assert
    expect(bodyInput).toHaveValue('<p>bodytest</p>');
  });

  it('should call createThread function when create button is clicked', async () => {
    // arrange
    const titleInput = screen.getByPlaceholderText('Title');
    const categoryInput = screen.getByPlaceholderText('Category (opsional)');
    const bodyInput = screen.getByPlaceholderText('Description...');
    const createButton = screen.getByRole('button', { name: 'Posting' });

    // action
    await userEvent.type(titleInput, 'titletest');
    await userEvent.type(categoryInput, 'categorytest');
    await userEvent.type(bodyInput, 'bodytest');
    await userEvent.click(createButton);

    // assert
    expect(mockRegister).toBeCalledWith({
      title: 'titletest',
      category: 'categorytest',
      body: 'bodytest',
    });
  });
});
