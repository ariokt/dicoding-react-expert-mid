/**
 * skenario test
 *
 * - asyncPopulateUsersAndThreads thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncPopulateUsersAndThreads } from './action';
import { receiveUsersActionCreator } from '../users/action';
import { getAllThreadsActionCreator } from '../threads/action';

const fakeThreadsResponse = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const fakeUsersResponse = [
  {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPopulateUsersAndThreads thunk', () => {
  // backup restore
  beforeEach(() => {
    api._getUsers = api.getUsers;
    api._getThreads = api.getThreads;
  });

  afterEach(() => {
    api.getUsers = api._getUsers;
    api.getThreads = api._getThreads;

    // delete backup data
    delete api._getUsers;
    delete api._getThreads;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    api.getUsers = () => Promise.resolve(fakeUsersResponse);
    api.getThreads = () => Promise.resolve(fakeThreadsResponse);

    const dispatch = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalled(showLoading());
    expect(dispatch).toHaveBeenCalled(receiveUsersActionCreator(fakeUsersResponse));
    expect(dispatch).toHaveBeenCalled(getAllThreadsActionCreator(fakeThreadsResponse));
    expect(dispatch).toHaveBeenCalled(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    api.getUsers = () => Promise.reject(fakeErrorResponse);
    api.getThreads = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalled(showLoading());
    expect(dispatch).toHaveBeenCalled(hideLoading());
    expect(window.alert).toHaveBeenCalled(fakeErrorResponse.message);
  });
});
