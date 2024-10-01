import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Items = () => {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', price: '', category: '' });

    useEffect(() => {
        axios.get('/api/items').then(res => setItems(res.data));
        axios.get('/api/categories').then(res => setCategories(res.data));
    }, []);

    const addItem = () => {
        axios.post('/api/items', newItem)
            .then(res => setItems([...items, res.data]))
            .catch(err => console.log(err));
    };

    return (
        <div>
            <h2>Items</h2>
            <input placeholder="Name" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} />
            <input placeholder="Price" value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} />
            <select onChange={e => setNewItem({...newItem, category: e.target.value})}>
                <option>Select Category</option>
                {categories.map(category => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                ))}
            </select>
            <button onClick={addItem}>Add Item</button>
            <ul>
                {items.map(item => (
                    <li key={item._id}>{item.name} - {item.price} - {item.category.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Items;
