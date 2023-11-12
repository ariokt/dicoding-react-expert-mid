/**
* test scenario for threadsReducer
*
* - detailThreaddReducer function
*  - should return the initial state when given by unknown action
*  - should return the thread detail when given by GET_THREAD_DETAIL action
*  - should return the thread detail with a comment when given by CREATE_COMMENT action
*  - should return the thread detail liked when given by UP_VOTE_THREAD action
*  - should return the thread detail disliked when given by DOWN_VOTE_DETAIL action
*  - should return the thread detail neutral when given by NEUTRAL_VOTE_DETAIL action
*  - should return the thread detail with liked comment when given by COMMENT_UP_VOTE action
*  - should return the thread detail with disliked comment when given by COMMENT_DOWN_VOTE action
*  - should return the thread detail comment neutral when given by COMMENT_NEUTRAL_VOTE action
*
*/

import { describe, expect, it } from 'vitest';
import detailThreadReducer from './reducer';

describe('detailThreaddReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the thread detail when given by GET_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {};
    const action = {
      type: 'GET_THREAD_DETAIL',
      payload: {
        thread: {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
          comments: [
            {
              id: 'comment-1',
              content: 'Ini adalah komentar pertama',
              createdAt: '2021-06-21T07:00:00.000Z',
              owner: {
                id: 'users-1',
                name: 'John Doe',
                avatar: 'https://generated-image-url.jpg',
              },
              upVotesBy: [],
              downVotesBy: [],
            },
          ],
        },
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.thread);
  });

  it('should return the thread detail with a comment when given by CREATE_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: 'CREATE_COMMENT',
      payload: {
        comment: {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          upVotesBy: [],
          downVotesBy: [],
          owner: {
            id: 'users-1',
            name: 'John Doe',
            email: 'john@example.com',
          },
        },
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [action.payload.comment],
    });
  });

  it('should return the thread detail liked when given by UP_VOTE_THREAD action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: 'UP_VOTE_DETAIL',
      payload: {
        userId: 'users-2',
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [action.payload.userId],
    });
  });

  it('should return the thread detail disliked when given by DOWN_VOTE_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: 'DOWN_VOTE_DETAIL',
      payload: {
        userId: 'users-2',
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      downVotesBy: [action.payload.userId],
    });
  });

  it('should return the thread detail neutral when given by NEUTRAL_VOTE_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: ['users-2'],
      downVotesBy: ['users-3'],
      comments: [],
    };

    const action1 = {
      type: 'NEUTRAL_VOTE_DETAIL',
      payload: {
        userId: 'users-2',
      },
    };

    const action2 = {
      type: 'NEUTRAL_VOTE_DETAIL',
      payload: {
        userId: 'users-3',
      },
    };

    // action 1
    const nextState1 = detailThreadReducer(initialState, action1);

    // assert 1
    expect(nextState1).toEqual({
      ...initialState,
      upVotesBy: [],
    });

    // action 2
    const nextState2 = detailThreadReducer(initialState, action2);

    // assert 2
    expect(nextState2).toEqual({
      ...initialState,
      downVotesBy: [],
    });
  });

  it('should return the thread detail with liked comment when given by COMMENT_UP_VOTE action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: 'COMMENT_UP_VOTE',
      payload: {
        commentId: 'comment-1',
        userId: 'users-2',
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [{
        ...initialState.comments[0],
        upVotesBy: ['users-2'],
      }],
    });
  });

  it('should return the thread detail with disliked comment when given by COMMENT_DOWN_VOTE action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: 'COMMENT_DOWN_VOTE',
      payload: {
        commentId: 'comment-1',
        userId: 'users-2',
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [{
        ...initialState.comments[0],
        downVotesBy: ['users-2'],
      }],
    });
  });

  it('should return the thread detail comment neutral when given by COMMENT_NEUTRAL_VOTE action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: ['users-2'],
          downVotesBy: ['users-3'],
        },
      ],
    };

    const action1 = {
      type: 'COMMENT_NEUTRAL_VOTE',
      payload: {
        commentId: 'comment-1',
        userId: 'users-2',
      },
    };

    const action2 = {
      type: 'COMMENT_NEUTRAL_VOTE',
      payload: {
        commentId: 'comment-1',
        userId: 'users-3',
      },
    };

    // action 1
    const nextState1 = detailThreadReducer(initialState, action1);

    // assert
    expect(nextState1).toEqual({
      ...initialState,
      comments: [{
        ...initialState.comments[0],
        upVotesBy: [],
      }],
    });

    // action 2
    const nextState2 = detailThreadReducer(initialState, action2);

    // assert
    expect(nextState2).toEqual({
      ...initialState,
      comments: [{
        ...initialState.comments[0],
        downVotesBy: [],
      }],
    });
  });
});
