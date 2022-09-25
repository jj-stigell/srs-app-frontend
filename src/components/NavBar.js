import React from 'react';
import LanguageBar from './LanguageBar';

const NavBar = () => {
  return (
    <div>
      <ul>
        <li><a href="default.asp">Dashboard</a></li>
        <li><a href="about.asp">Settings</a></li>
        <li><a href="about.asp">Logout</a></li>
        <LanguageBar />
      </ul>
    </div>
  );
};

export default NavBar;
