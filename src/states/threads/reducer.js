import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.GET_THREADS:
      return action.payload.threads;
    case ActionType.UP_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.concat([action.payload.userId]),
            downVotesBy: thread.downVotesBy.filter((id) => id !== action.payload.userId),
          };
        }
        return thread;
      });
    case ActionType.DOWN_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            downVotesBy: thread.downVotesBy.concat([action.payload.userId]),
            upVotesBy: thread.upVotesBy.filter((id) => id !== action.payload.userId),
          };
        }
        return thread;
      });
    case ActionType.NEUTRAL_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            downVotesBy: thread.downVotesBy.filter((id) => id !== action.payload.userId),
            upVotesBy: thread.upVotesBy.filter((id) => id !== action.payload.userId),
          };
        }
        return thread;
      });
    default:
      return threads;
  }
}

export default threadsReducer;
