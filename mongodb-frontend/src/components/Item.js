import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Item = () => {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/items')
            .then(res => setItems(res.data))
            .catch(err => console.error(err));

        axios.get('http://localhost:5000/categories')
            .then(res => setCategories(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/items', { name, price, category })
            .then(res => setItems([...items, res.data]))
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h2>Items</h2>
            <ul>
                {items.map(item => (
                    <li key={item._id}>{item.name} - {item.price} (Category: {item.category.name})</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Item Name"
                />
                <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="Item Price"
                />
                <select value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </select>
                <button type="submit">Add Item</button>
            </form>
        </div>
    );
};

export default Item;
