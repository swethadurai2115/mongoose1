import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Category.css'; // Import the CSS file

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');

    // Fetch categories when the component loads
    useEffect(() => {
        axios.get('http://localhost:5000/categories')
            .then(res => setCategories(res.data))
            .catch(err => console.error(err));
    }, []);

    // Handle adding a new category
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/categories', { name })
            .then(res => setCategories([...categories, res.data]))
            .catch(err => console.error(err));
        setName(''); // Clear input after adding category
    };

    // Handle deleting a category
    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/categories/${id}`)
            .then(() => {
                // Remove the deleted category from the UI
                setCategories(categories.filter(category => category._id !== id));
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="category-container">
            <form onSubmit={handleSubmit} className="category-form">
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Category Name"
                    className="category-input"
                />
                <button type="submit" className="category-button">Add Category</button>
            </form>
            
            <h2 className="category-title">Categories</h2>
            <ul className="category-list">
                {categories.map(category => (
                    <li key={category._id} className="category-item">
                        {category.name}
                        <button className="delete-button" onClick={() => handleDelete(category._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Category;
