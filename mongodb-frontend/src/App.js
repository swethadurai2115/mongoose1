import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Category from './components/Category';
import Item from './components/Item';
import Sale from './components/Sale';

const App = () => {
    return (
        <Router>
            <div>
                <NavBar />
                <Routes>
                    <Route path="/categories" element={<Category />} />
                    <Route path="/items" element={<Item />} />
                    <Route path="/sales" element={<Sale />} />
                    <Route path="/" element={<h2>Welcome! Please select a section.</h2>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
