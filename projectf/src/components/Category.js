import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');

    useEffect(() => {
        axios.get('/api/categories').then(res => setCategories(res.data));
    }, []);

    const addCategory = () => {
        axios.post('/api/categories', { name: newCategory })
            .then(res => setCategories([...categories, res.data]))
            .catch(err => console.log(err));
    };

    return (
        <div>
            <h2>Categories</h2>
            <input value={newCategory} onChange={e => setNewCategory(e.target.value)} />
            <button onClick={addCategory}>Add Category</button>
            <ul>
                {categories.map(category => (
                    <li key={category._id}>{category.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
