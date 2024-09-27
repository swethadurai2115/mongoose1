import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/categories')
            .then(res => setCategories(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/categories', { name })
            .then(res => setCategories([...categories, res.data]))
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h2>Categories</h2>
            <ul>
                {categories.map(category => <li key={category._id}>{category.name}</li>)}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Category Name"
                />
                <button type="submit">Add Category</button>
            </form>
        </div>
    );
};

export default Category;
