import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemCrud = () => {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

// Fetch all items
    const fetchItems = async () => {
        try {
            const res = await axios.get('http://localhost:5000/items');
            setItems(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // Create new item
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newItem = { name, price, quantity };
            if (editId) {
                // Update item if editId is set
                await axios.put(`http://localhost:5000/items/${editId}`, newItem);
                setEditId(null);
            } else {
                // Create new item
                await axios.post('http://localhost:5000/items', newItem);
            }
            fetchItems();
            setName('');
            setPrice('');
            setQuantity('');
        } catch (err) {
            console.error(err);
        }
    };

    // Edit an item
    const handleEdit = (item) => {
        setEditId(item._id);
        setName(item.name);
        setPrice(item.price);
        setQuantity(item.quantity);
    };

    // Delete an item
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/items/${id}`);
            fetchItems();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Item Management</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    value={price}
                    placeholder="Price"
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <input
                    type="number"
                    value={quantity}
                    placeholder="Quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                />
                <button type="submit">{editId ? 'Update' : 'Create'} Item</button>
            </form>

            <ul>
                {items.map(item => (
                    <li key={item._id}>
                        {item.name} - ${item.price} (Qty: {item.quantity})
                        <button onClick={() => handleEdit(item)}>Edit</button>
                        <button onClick={() => handleDelete(item._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemCrud;
