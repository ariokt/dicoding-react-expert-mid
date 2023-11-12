/**
 * skenario testing
 *
 * - RegisterInput component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import RegisterInput from './RegisterInput';

expect.extend(matchers);

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const nameInput = await screen.getByPlaceholderText('Name');

    // action
    await userEvent.type(nameInput, 'ario');

    // assert
    expect(nameInput).toHaveValue('ario');
  });

  it('should handle email typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('Email');

    // action
    await userEvent.type(emailInput, 'ari@mail.com');

    // assert
    expect(emailInput).toHaveValue('ari@mail.com');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    // action
    await userEvent.type(passwordInput, 'ariari');

    // assert
    expect(passwordInput).toHaveValue('ariari');
  });

  it('should call login function when login button is clicked', async () => {
    // arrange
    const mockRegister = vi.fn();
    render(<RegisterInput register={mockRegister} />);
    const nameInput = await screen.getByPlaceholderText('Name');
    await userEvent.type(nameInput, 'ario');
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'ari@mail.com');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'ariari');
    const registerButton = await screen.getByRole('button', { name: 'Register' });

    // action
    await userEvent.click(registerButton);

    // assert
    expect(mockRegister).toBeCalledWith({
      name: 'ario',
      email: 'ari@mail.com',
      password: 'ariari',
    });
  });
});
