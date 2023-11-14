import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { BsReply } from 'react-icons/bs';
import {
  AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { postedAt } from '../utils';
import Tag from './Tag';

function ThreadItem(props) {
  const {
    body,
    category,
    createdAt,
    downVotesBy,
    upVotesBy,
    id,
    title,
    totalComments,
    user,
    authUser,
    threadFunction,
  } = props;

  const {
    handleLike,
    handleDislike,
    handleNeutralizeLike,
    handleNeutralizeDislike,
  } = threadFunction;

  const isThreadLiked = upVotesBy.includes(authUser);

  const isThreadDisliked = downVotesBy.includes(authUser);
  return (
    <div className="talk-item">
      <div className="talk-item__user-photo">
        <img src={user.avatar} alt={user} width={40} />
      </div>
      <div className="talk-item__detail">
        <header className="d-flex align-items-center">
          <div className="talk-item__user-info d-flex align-items-center gap-3">
            <p className="talk-item__user-name">{user.name}</p>
            <Tag text={category} type="primary" />
          </div>
          <p className="talk-item__created-at">{postedAt(createdAt)}</p>
        </header>
        <Link to={`/detail-thread/${id}`}>
          <h5 className="mb-2">{title}</h5>
          <div className="talk-item__text">
            <div className="html-container">{parse(body)}</div>
          </div>
        </Link>
        <div className="d-flex gap-2 mt-2">
          <div type="submit" className="talk-item__button d-flex align-items-center">
            {isThreadLiked
              ? <AiFillLike size={20} onClick={() => handleNeutralizeLike(id)} />
              : <AiOutlineLike size={20} onClick={() => handleLike(id)} />}
            <p>{upVotesBy.length}</p>
          </div>
          <div type="submit" className="talk-item__button d-flex align-items-center">
            {isThreadDisliked
              ? <AiFillDislike size={20} onClick={() => handleNeutralizeDislike(id)} />
              : <AiOutlineDislike size={20} onClick={() => handleDislike(id)} />}
            <p>{downVotesBy.length}</p>
          </div>
          <div type="submit" className="talk-item__button d-flex align-items-center">
            <BsReply size={20} />
            <p>{totalComments}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  user: PropTypes.shape(userShape).isRequired,
  authUser: PropTypes.string.isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  threadFunction: PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
};

export { threadItemShape };

export default ThreadItem;
