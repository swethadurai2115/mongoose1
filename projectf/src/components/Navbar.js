// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/categories">Category</Link></li>
        <li><Link to="/Item">Item</Link></li>
        <li><Link to="/Sale">Sale</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
