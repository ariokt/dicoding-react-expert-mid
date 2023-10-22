import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLangEngActionCreator, setLangIndActionCreator } from '../states/lang/action';

function Header() {
  const { lang } = useSelector((states) => states);
  const dispatch = useDispatch();

  const handleLangInd = () => {
    dispatch(setLangIndActionCreator());
  };

  const handleLangEng = () => {
    dispatch(setLangEngActionCreator());
  };

  return (
    <>
      <div className="header p-2 h3 text-center m-0">DICODING FORUM APP</div>
      <div className="d-flex gap-2 px-2 justify-content-end justify-content-md-center">
        <button type="button" className="lang-button" onClick={handleLangEng}><p className={lang === 'eng' ? 'fw-bold' : ''}>English</p></button>
        <p>|</p>
        <button type="button" className="lang-button" onClick={handleLangInd}><p className={lang === 'ind' ? 'fw-bold' : ''}>Indonesia</p></button>
      </div>
    </>
  );
}

export default Header;
