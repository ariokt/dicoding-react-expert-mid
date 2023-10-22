import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetAllLeaderboards } from '../states/leaderboards/action';
import LeaderboardsItem from '../components/LeaderboardsItem';
import Loading from '../components/Loading';

function Leaderboards() {
  const {
    leaderboards = [],
    lang,
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetAllLeaderboards());
  }, [dispatch]);
  return (
    <>
      <Loading />
      {lang === 'ind'
        && (
          <h3>Klasmen Pengguna Aktif</h3>
        )}
      {lang === 'eng'
        && (
          <h3>Active User Classement</h3>
        )}
      <div className="d-flex justify-content-between mb-2">
        <h5>Pengguna</h5>
        <h5 className="fw-bold">Skor</h5>
      </div>
      <div className="mb-5">
        {leaderboards.map((item) => (
          <LeaderboardsItem key={item.user.id} {...item} />
        ))}
      </div>
    </>
  );
}

export default Leaderboards;
