import React from 'react';
import { MdForum, MdInsertChart } from 'react-icons/md';
import { BiSolidLogOutCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';

function Footer() {
  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
  };

  return (
    <div className="footer w-100 py-2">
      <div className="mx-auto w-50 h-100 d-flex justify-content-evenly">
        <Link to="/" className="d-flex flex-column align-items-center">
          <MdForum fontSize={24} />
          <p className="mb-0">Threads</p>
        </Link>
        <Link to="/leaderboards" className="d-flex flex-column align-items-center">
          <MdInsertChart fontSize={24} />
          <p className="mb-0">Leaderboards</p>
        </Link>
        <Link to="/login" className="d-flex flex-column align-items-center" onClick={handleLogout}>
          <BiSolidLogOutCircle fontSize={24} />
          <p className="mb-0">Logout</p>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
