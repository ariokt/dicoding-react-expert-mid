import React from 'react';
import PropTypes from 'prop-types';

function LeaderboardsItem(props) {
  const { user, score } = props;
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <div className="d-flex gap-3 align-items-center">
        <img className="leaderboards__img" width={48} height={48} alt="user-avatar" src={user.avatar} />
        <h5>{user.name}</h5>
      </div>
      <h5 className="fw-bold">{score}</h5>
    </div>
  );
}

LeaderboardsItem.propTypes = {
  score: PropTypes.number.isRequired,
  user: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default LeaderboardsItem;
