import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Categories from './components/Category';
import Items from './components/Item';
import Sales from './components/Sale';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/categories" element={<Categories />} />
            <Route path="/items" element={<Items />} />
            <Route path="/sales" element={<Sales />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

