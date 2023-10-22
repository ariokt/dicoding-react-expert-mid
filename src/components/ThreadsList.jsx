import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import ThreadItem, { threadItemShape } from './ThreadItem';
import {
  asyncNeutralizeDownVote, asyncNeutralizeUpVote, asyncToogleDownVote, asyncToogleUpVote,
} from '../states/threads/action';

function ThreadsList(props) {
  const { threads } = props;
  const dispatch = useDispatch();

  const handleLike = (id) => {
    dispatch(asyncToogleUpVote(id));
  };

  const handleDislike = (id) => {
    dispatch(asyncToogleDownVote(id));
  };

  const handleNeutralizeLike = (id) => {
    dispatch(asyncNeutralizeUpVote(id));
  };

  const handleNeutralizeDislike = (id) => {
    dispatch(asyncNeutralizeDownVote(id));
  };

  const threadFunction = {
    handleLike,
    handleDislike,
    handleNeutralizeLike,
    handleNeutralizeDislike,
  };

  return (
    <div className="talks-list">
      {
         threads.map((thread) => (
           <ThreadItem key={thread.id} {...thread} threadFunction={threadFunction} />
         ))
      }
    </div>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
};

export default ThreadsList;
