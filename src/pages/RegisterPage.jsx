import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { MdForum } from 'react-icons/md';
import { asyncRegisterUser } from '../states/authUser/action';
import RegisterInput from '../components/RegisterInput';
import { setLangEngActionCreator, setLangIndActionCreator } from '../states/lang/action';
import Loading from '../components/Loading';

function RegisterPage() {
  const { lang } = useSelector((states) => states);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = async ({ name, email, password }) => {
    const result = await dispatch(asyncRegisterUser({ name, email, password }));
    if (result) {
      navigate('/login');
    }
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
      <section className="register-page">
        <header className="register-page__hero">
          <MdForum size={200} />
        </header>
        <article className="register-page__main">
          <div className="d-flex gap-2">
            <button type="button" className="lang-button" onClick={handleLangEng}><p className={lang === 'eng' ? 'fw-bold' : ''}>English</p></button>
            <p>|</p>
            <button type="button" className="lang-button" onClick={handleLangInd}><p className={lang === 'ind' ? 'fw-bold' : ''}>Indonesia</p></button>
          </div>
          {lang === 'eng'
            && (
              <h2>Create your account</h2>
            )}
          {lang === 'ind'
            && (
              <h2>Buat akun kamu</h2>
            )}
          <RegisterInput register={onRegister} />
          {lang === 'eng'
            && (
              <p>
                Already have an account?
                {' '}
                <Link to="/login">Login</Link>
              </p>
            )}
          {lang === 'ind'
            && (
              <p>
                Sudah memiliki akun?
                {' '}
                <Link to="/login">Masuk</Link>
              </p>
            )}
        </article>
      </section>
    </>
  );
}

export default RegisterPage;
