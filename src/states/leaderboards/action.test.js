/**
 * skenario test
 *
 * - asyncGetAllLeaderboards thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncGetAllLeaderboards, getAllLeaderboardsActionCreator } from './action';

const fakeLeaderboardsResponse = [
  {
    user: {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
    score: 10,
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPopulateUsersAndThreads thunk', () => {
  // backup restore
  beforeEach(() => {
    api._getLeaderboards = api.getLeaderboards;
  });

  afterEach(() => {
    api.getLeaderboards = api._getLeaderboards;

    // delete backup data
    delete api._getLeaderboards;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    api.getLeaderboards = () => Promise.resolve(fakeLeaderboardsResponse);

    const dispatch = vi.fn();

    // action
    await asyncGetAllLeaderboards()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalled(showLoading());
    expect(dispatch).toHaveBeenCalled(getAllLeaderboardsActionCreator(fakeLeaderboardsResponse));
    expect(dispatch).toHaveBeenCalled(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    api.getLeaderboards = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();

    // action
    await asyncGetAllLeaderboards()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalled(showLoading());
    expect(dispatch).toHaveBeenCalled(hideLoading());
    expect(window.alert).toHaveBeenCalled(fakeErrorResponse.message);
  });
});
