import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdAddCircle } from 'react-icons/md';
import { Link, useSearchParams } from 'react-router-dom';
import ThreadsList from '../components/ThreadsList';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import Loading from '../components/Loading';
import SearchBar from '../components/SearchBar';

function HomePage() {
  const {
    threads = [],
    users = [],
    authUser,
    lang,
  } = useSelector((states) => states);

  const [searchParams, setSearchParams] = useSearchParams();
  const filterCategory = searchParams.get('category') || '';

  const changeCategory = (category) => {
    setSearchParams({ category });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  })).filter((thread) => thread.category.toLowerCase().includes(filterCategory.toLowerCase()));

  return (
    <>
      <Loading />
      <SearchBar category={filterCategory} changeCategory={changeCategory} />
      {lang === 'ind'
        && (
          <h3>Diskusi Tersedia</h3>
        )}
      {lang === 'eng'
        && (
          <h3>Available Discussion</h3>
        )}
      <ThreadsList threads={threadList} />
      <Link to="/add-thread" className="add-thread-button">
        <MdAddCircle />
      </Link>
    </>
  );
}

export default HomePage;
