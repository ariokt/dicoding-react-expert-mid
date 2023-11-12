/**
* test scenario for threadsReducer
*
* - threadsReducers function
*  - should return the initial state when given by unknown action
*  - should return the threads when given by GET_THREADS action
*  - should return the threads with the liked thread when given by UP_VOTE_THREAD action
*  - should return the threads with the disliked thread when given by DOWN_VOTE_THREAD action
*  - should return the threads with the no vote thread when given by NEUTRAL_VOTE_THREAD action
*
*/

import { describe, expect, it } from 'vitest';
import threadsReducer from './reducer';

describe('threadsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by GET_THREADS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'GET_THREADS',
      payload: {
        threads: [
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
        ],
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return the threads with the liked thread when given by UP_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
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

    const action = {
      type: 'UP_VOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'users-2',
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [action.payload.userId],
      },
    ]);
  });

  it('should return the threads with the disliked thread when given by DOWN_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
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

    const action = {
      type: 'DOWN_VOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'users-2',
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        downVotesBy: [action.payload.userId],
      }]);
  });

  it('should return the threads with the no vote thread when given by NEUTRAL_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: ['users-2'],
        downVotesBy: ['users-3'],
        totalComments: 0,
      },
    ];

    const action1 = {
      type: 'NEUTRAL_VOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'users-2',
      },
    };

    const action2 = {
      type: 'NEUTRAL_VOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'users-3',
      },
    };

    // action 1
    const nextState1 = threadsReducer(initialState, action1);

    // assert 1
    expect(nextState1).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
      }]);

    // action 2
    const nextState2 = threadsReducer(initialState, action2);

    // assert 2
    expect(nextState2).toEqual([
      {
        ...initialState[0],
        downVotesBy: [],
      }]);
  });
});
