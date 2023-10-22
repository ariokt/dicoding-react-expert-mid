import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { asyncAddNewThread } from '../states/threads/action';
import Loading from '../components/Loading';

function AddThreadPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lang } = useSelector((states) => states);
  const [title, handleTitleChange] = useInput('');
  const [body, handleBodyChange] = useInput('');
  const [category, handleCategoryChange] = useInput('');

  const handleInputJudul = (e) => {
    handleTitleChange(e);
  };

  const handleInputKategori = (e) => {
    handleCategoryChange(e);
  };

  const handleInputBody = (e) => {
    handleBodyChange(e);
  };

  const onSumbit = async () => {
    dispatch(asyncAddNewThread({ title, body, category }));
    navigate('/');
  };
  return (
    <>
      <Loading />
      {lang === 'ind'
        && (
          <h3>Buat Diskusi Baru</h3>
        )}
      {lang === 'eng'
        && (
          <h3>Create New Discussion</h3>
        )}
      <input type="text" placeholder="Judul" className="add-thread__input w-100 mb-2" value={title} onChange={handleInputJudul} required />
      <input type="text" placeholder="Kategori" className="add-thread__input w-100 mb-2" value={category} onChange={handleInputKategori} />
      <textarea className="add-thread__input w-100 mb-2" value={body} onChange={handleInputBody} required />
      <button type="submit" className="add-thread__button w-100" onClick={onSumbit}>Buat</button>
    </>
  );
}

export default AddThreadPage;
