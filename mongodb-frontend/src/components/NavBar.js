import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Optional: CSS for styling

const NavBar = () => {
    return (
        <nav className="navbar">
            <Link to="/categories">
                <button className="nav-button">Categories</button>
            </Link>
            <Link to="/items">
                <button className="nav-button">Items</button>
            </Link>
            <Link to="/sales">
                <button className="nav-button">Sales</button>
            </Link>
        </nav>
    );
};

export default NavBar;
