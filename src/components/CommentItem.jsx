import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import {
  AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike,
} from 'react-icons/ai';
import { postedAt } from '../utils';

function CommentItem({ comment, commentFunction }) {
  const {
    id, threadId, content, createdAt, downVotesBy, upVotesBy, owner, authUser,
  } = comment;

  const {
    handleLikeComment,
    handleDislikeComment,
    handleNeutralizeLikeComment,
    handleNeutralizeDislikeComment,
  } = commentFunction;

  const isThreadLiked = upVotesBy.includes(authUser);

  const isThreadDisliked = downVotesBy.includes(authUser);
  return (
    <div className="d-flex flex-column gap-2 mb-4">
      <div className="d-flex justify-content-between">
        <div className="d-flex gap-2">
          <div className="talk-item__user-photo">
            <img src={owner.avatar} alt={owner.name} width={24} />
          </div>
          <div className="fw-bold">{owner.name}</div>
        </div>
        <div>
          <p className="talk-item__created-at">{postedAt(createdAt)}</p>
        </div>
      </div>
      <div>{parse(content)}</div>
      <div className="d-flex gap-2">
        <div type="submit" className="talk-item__button d-flex align-items-center">
          {isThreadLiked
            ? <AiFillLike size={20} onClick={() => handleNeutralizeLikeComment(threadId, id)} />
            : <AiOutlineLike size={20} onClick={() => handleLikeComment(threadId, id)} />}
          <p>{upVotesBy.length}</p>
        </div>
        <div type="submit" className="talk-item__button d-flex align-items-center">
          {isThreadDisliked
            ? (
              <AiFillDislike
                size={20}
                onClick={() => handleNeutralizeDislikeComment(threadId, id)}
              />
            )
            : <AiOutlineDislike size={20} onClick={() => handleDislikeComment(threadId, id)} />}
          <p>{downVotesBy.length}</p>
        </div>
      </div>
      <hr />
    </div>
  );
}

const commentItemShape = {
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  owner: PropTypes.objectOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
  threadId: PropTypes.string.isRequired,
};

CommentItem.propTypes = {
  comment: PropTypes.shape(commentItemShape).isRequired,
  commentFunction: PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
};

export { commentItemShape };

export default CommentItem;
