import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function SearchBar({ category, changeCategory }) {
  const { lang } = useSelector((states) => states);
  return (
    <input
      className="search-bar mb-3 px-3 py-1"
      type="text"
      placeholder={lang === 'ind' ? 'Cari kategori' : 'Search by category'}
      value={category}
      onChange={(event) => changeCategory(event.target.value)}
    />
  );
}

SearchBar.propTypes = {
  category: PropTypes.string.isRequired,
  changeCategory: PropTypes.func.isRequired,
};

export default SearchBar;
