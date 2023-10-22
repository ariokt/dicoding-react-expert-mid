import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  GET_THREADS: 'GET_THREADS',
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
  NEUTRAL_VOTE_THREAD: 'NEUTRAL_VOTE_THREAD',
};

function getAllThreadsActionCreator(threads) {
  return {
    type: ActionType.GET_THREADS,
    payload: {
      threads,
    },
  };
}

function toggleUpVoteActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleDownVoteActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleNeutralVoteActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRAL_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncGetAllThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const threads = await api.getThreads();
      dispatch(getAllThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncAddNewThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.addNewThread({ title, body, category });
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToogleUpVote(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleUpVoteActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.toggleUpVote(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleNeutralVoteActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

function asyncToogleDownVote(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleDownVoteActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.toggleDownVote(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleNeutralVoteActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

function asyncNeutralizeUpVote(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleNeutralVoteActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.neutralizeVote(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpVoteActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

function asyncNeutralizeDownVote(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleNeutralVoteActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.neutralizeVote(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownVoteActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

export {
  ActionType,
  getAllThreadsActionCreator,
  asyncGetAllThreads,
  asyncAddNewThread,
  toggleUpVoteActionCreator,
  toggleDownVoteActionCreator,
  asyncToogleUpVote,
  asyncToogleDownVote,
  asyncNeutralizeUpVote,
  asyncNeutralizeDownVote,
};
