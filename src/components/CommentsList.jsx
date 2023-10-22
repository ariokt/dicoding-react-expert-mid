import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import CommentItem, { commentItemShape } from './CommentItem';
import {
  asyncDislikeComment,
  asyncLikeComment,
  asyncNeutralizeDownVoteComment,
  asyncNeutralizeUpVoteComment,
} from '../states/threadDetail/action';

function CommentsList(props) {
  const { comments } = props;
  const dispatch = useDispatch();

  const handleLikeComment = (threadId, commentId) => {
    dispatch(asyncLikeComment(threadId, commentId));
  };

  const handleDislikeComment = (threadId, commentId) => {
    dispatch(asyncDislikeComment(threadId, commentId));
  };

  const handleNeutralizeLikeComment = (threadId, commentId) => {
    dispatch(asyncNeutralizeUpVoteComment(threadId, commentId));
  };

  const handleNeutralizeDislikeComment = (threadId, commentId) => {
    dispatch(asyncNeutralizeDownVoteComment(threadId, commentId));
  };

  const commentFunction = {
    handleLikeComment,
    handleDislikeComment,
    handleNeutralizeLikeComment,
    handleNeutralizeDislikeComment,
  };

  return (
    <>
      {
        comments.map((item) => (
          <CommentItem key={item.id} comment={item} commentFunction={commentFunction} />
        ))
      }
    </>
  );
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(commentItemShape)).isRequired,
};

export default CommentsList;
