import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  GET_THREAD_DETAIL: 'GET_THREAD_DETAIL',
  UP_VOTE_DETAIL: 'UP_VOTE_DETAIL',
  DOWN_VOTE_DETAIL: 'DOWN_VOTE_DETAIL',
  NEUTRAL_VOTE_DETAIL: 'NEUTRAL_VOTE_DETAIL',
  CREATE_COMMENT: 'CREATE_COMMENT',
  COMMENT_UP_VOTE: 'COMMENT_UP_VOTE',
  COMMENT_DOWN_VOTE: 'COMMENT_DOWN_VOTE',
  COMMENT_NEUTRAL_VOTE: 'COMMENT_NEUTRAL_VOTE',
};

function getThreadDetailActionCreator(thread) {
  return {
    type: ActionType.GET_THREAD_DETAIL,
    payload: {
      thread,
    },
  };
}

function createCommentActionCreator(comment) {
  return {
    type: ActionType.CREATE_COMMENT,
    payload: {
      comment,
    },
  };
}

function upVoteDetailActionCreator(userId) {
  return {
    type: ActionType.UP_VOTE_DETAIL,
    payload: {
      userId,
    },
  };
}

function downVoteDetailActionCreator(userId) {
  return {
    type: ActionType.DOWN_VOTE_DETAIL,
    payload: {
      userId,
    },
  };
}

function neutralVoteDetailActionCreator(userId) {
  return {
    type: ActionType.NEUTRAL_VOTE_DETAIL,
    payload: {
      userId,
    },
  };
}

function asyncGetDetailThread(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.getDetailThread(threadId);
      dispatch(getThreadDetailActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncCreateComment(threadId, comment) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await api.createCommentThread(threadId, comment);
      dispatch(createCommentActionCreator(response));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncLikeDetailThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(upVoteDetailActionCreator(authUser.id));
    try {
      await api.toggleUpVote(threadId);
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncDislikeDetailThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(downVoteDetailActionCreator(authUser.id));
    try {
      await api.toggleDownVote(threadId);
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncNeutralizeUpVoteDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(neutralVoteDetailActionCreator(authUser.id));

    try {
      await api.neutralizeVote(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(upVoteDetailActionCreator(authUser.id));
    }
  };
}

function asyncNeutralizeDownVoteDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(neutralVoteDetailActionCreator(authUser.id));

    try {
      await api.neutralizeVote(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(downVoteDetailActionCreator(authUser.id));
    }
  };
}
//
function upVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.COMMENT_UP_VOTE,
    payload: {
      commentId,
      userId,
    },
  };
}

function downVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.COMMENT_DOWN_VOTE,
    payload: {
      commentId,
      userId,
    },
  };
}

function neutralVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.COMMENT_NEUTRAL_VOTE,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncLikeComment(threadId, commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(upVoteCommentActionCreator({ commentId, userId: authUser.id }));
    try {
      await api.toggleCommentUpVote(threadId, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(neutralVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
    dispatch(hideLoading());
  };
}

function asyncDislikeComment(threadId, commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(downVoteCommentActionCreator({ commentId, userId: authUser.id }));
    try {
      await api.toggleCommentDownVote(threadId, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(neutralVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
    dispatch(hideLoading());
  };
}

function asyncNeutralizeUpVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(neutralVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      await api.neutralizeCommentVote(threadId, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(upVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
  };
}

function asyncNeutralizeDownVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(neutralVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      await api.neutralizeCommentVote(threadId, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(downVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
  };
}

export {
  ActionType,
  getThreadDetailActionCreator,
  asyncGetDetailThread,
  createCommentActionCreator,
  asyncCreateComment,
  upVoteDetailActionCreator,
  downVoteDetailActionCreator,
  asyncLikeDetailThread,
  asyncDislikeDetailThread,
  neutralVoteDetailActionCreator,
  asyncNeutralizeUpVoteDetail,
  asyncNeutralizeDownVoteDetail,
  upVoteCommentActionCreator,
  downVoteCommentActionCreator,
  neutralVoteCommentActionCreator,
  asyncLikeComment,
  asyncDislikeComment,
  asyncNeutralizeUpVoteComment,
  asyncNeutralizeDownVoteComment,
};
