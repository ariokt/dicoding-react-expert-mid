/**
 * skenario testing
 *
 * - SearchBar component
 *   - renders SearchBar with correct placeholder based on lang
 *   - should handle kategori typing correctly
 */

import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import {
  afterEach, describe, expect, it,
} from 'vitest';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { Provider } from 'react-redux';
import SearchBar from './SearchBar';
import store from '../states/index';
import { setLangEngActionCreator } from '../states/lang/action';
import { act } from 'react-dom/test-utils';

expect.extend(matchers);

describe('SearchBar component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders SearchBar with correct placeholder based on lang', async () => {
    // arrange
    render(
      <Provider store={store}>
        <SearchBar changeCategory={() => {}} />
      </Provider>,
    );

    const categoryInput = await screen.getByPlaceholderText('Cari kategori');

    // assert
    expect(categoryInput).toBeInTheDocument();

    // action indonesia
    act(() => {
      store.dispatch(setLangEngActionCreator());
    });

    const updatedCategoryInput = await screen.getByPlaceholderText('Search by category');

    // assert indonesia
    expect(updatedCategoryInput).toBeInTheDocument();
  });

  it('should handle kategori typing correctly', async () => {
    // arrange
    render(
      <Provider store={store}>
        <SearchBar changeCategory={() => {}} />
      </Provider>,
    );

    const categoryInput = await screen.getByPlaceholderText('Search by category');

    // action
    await userEvent.type(categoryInput, 'test');

    // assert
    expect(categoryInput).toHaveValue('test');
  });
});
