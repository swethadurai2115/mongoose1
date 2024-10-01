import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Item.css'; // Make sure you have your CSS file imported

const Item = () => {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');

    useEffect(() => {
        // Fetch items and categories when the component mounts
        axios.get('http://localhost:5000/items')
            .then(res => setItems(res.data))
            .catch(err => console.error(err));

        axios.get('http://localhost:5000/categories')
            .then(res => setCategories(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Post new item to the server
        axios.post('http://localhost:5000/items', { name, price, category })
            .then(res => {
                setItems([...items, res.data]);
                // Reset form fields after submission
                setName('');
                setPrice(0);
                setCategory('');
            })
            .catch(err => console.error(err));
    };

    const handleDelete = (id) => {
        // Send a delete request to the server
        axios.delete(`http://localhost:5000/items/${id}`)
            .then(() => {
                // Filter out the deleted item from the state
                setItems(items.filter(item => item._id !== id));
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="item-container">
            <h2 className="item-title">Items</h2>

            {/* Form for adding items */}
            <form onSubmit={handleSubmit} className="item-form">
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Item Name"
                    className="item-input"
                    required
                />
                <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="Item Price"
                    className="item-input"
                    required
                />
                <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="item-select"
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                <button type="submit" className="item-button">Add Item</button>
            </form>

            {/* List of items */}
            <ul className="item-list">
                {items.map(item => (
                    <li key={item._id} className="item">
                        {item.name} - ${item.price}
                        {item.category ? (
                            <span className="item-category">(Category: {item.category.name})</span>
                        ) : (
                            <span className="item-category">(Category: Not Available)</span>
                        )}
                        {/* Delete button */}
                        <button 
                            className="delete-button" 
                            onClick={() => handleDelete(item._id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Item;
