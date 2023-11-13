import React from 'react';
import { MdForum } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';
import { setLangEngActionCreator, setLangIndActionCreator } from '../states/lang/action';
import Loading from '../components/Loading';

function LoginPage() {
  const { lang } = useSelector((states) => states);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = async ({ email, password }) => {
    await dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  };

  const handleLangInd = () => {
    dispatch(setLangIndActionCreator());
  };

  const handleLangEng = () => {
    dispatch(setLangEngActionCreator());
  };

  return (
    <>
      <Loading />
      <section className="login-page">
        <header className="login-page__hero">
          <MdForum size={200} />
        </header>
        <article className="login-page__main">
          <div className="d-flex gap-2">
            <button type="button" className="lang-button" onClick={handleLangEng}><p className={lang === 'eng' ? 'fw-bold' : ''}>English</p></button>
            <p>|</p>
            <button type="button" className="lang-button" onClick={handleLangInd}><p className={lang === 'ind' ? 'fw-bold' : ''}>Indonesia</p></button>
          </div>
          {lang === 'eng'
            && (
            <h2>
              Find
              {' '}
              <strong>The Answer</strong>
              ,
              {' '}
              <br />
              Through Dicoding Forum App.
            </h2>
            )}
          {lang === 'ind'
            && (
            <h2>
              Temukan
              {' '}
              <strong>Jawabannya</strong>
              ,
              {' '}
              <br />
              Melalui Aplikasi Forum Dicoding.
            </h2>
            )}
          <LoginInput login={onLogin} />
          {lang === 'eng'
            && (
            <p>
              Don&apos;t have an account?
              {' '}
              <Link to="/register">Register</Link>
            </p>
            )}
          {lang === 'ind'
            && (
            <p>
              Tidak punya akun?
              {' '}
              <Link to="/register">Daftar</Link>
            </p>
            )}
        </article>
      </section>
    </>
  );
}

export default LoginPage;
