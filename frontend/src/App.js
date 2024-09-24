import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [aggregatedData, setAggregatedData] = useState([]);

    // Function to fetch all items
    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/items');
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    // Function to fetch aggregated data
    const fetchAggregatedData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/items/aggregate');
            setAggregatedData(response.data);
        } catch (error) {
            console.error('Error fetching aggregated data:', error);
        }
    };

    // Handle form submission for adding an item
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/items', { name, category, price });
            fetchItems(); // Refresh items
            fetchAggregatedData(); // Refresh aggregated data
            setName('');
            setCategory('');
            setPrice('');
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    useEffect(() => {
        fetchItems();
        fetchAggregatedData();
    }, []);

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>Item Management</h1>
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Item Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ marginRight: '10px' }}
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    style={{ marginRight: '10px' }}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    style={{ marginRight: '10px' }}
                />
                <button type="submit">Add Item</button>
            </form>

            <h2>All Items</h2>
            {items.length > 0 ? (
                <ul>
                    {items.map((item) => (
                        <li key={item._id}>
                            {item.name} - {item.category} - ${item.price}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No items available.</p>
            )}

            <h2>Aggregated Data</h2>
            {aggregatedData.length > 0 ? (
                <ul>
                    {aggregatedData.map((data) => (
                        <li key={data._id}>
                            Category: {data._id} - Total Sales: ${data.totalSales} - Item Count: {data.itemCount}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No aggregated data available.</p>
            )}
        </div>
    );
}

export default App;
