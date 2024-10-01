import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Sales = () => {
    const [sales, setSales] = useState([]);
    const [items, setItems] = useState([]);
    const [newSale, setNewSale] = useState({ sale_items: [], total: 0 });

    useEffect(() => {
        axios.get('/api/sales').then(res => setSales(res.data));
        axios.get('/api/items').then(res => setItems(res.data));
    }, []);

    const addSale = () => {
        axios.post('/api/sales', newSale)
            .then(res => setSales([...sales, res.data]))
            .catch(err => console.log(err));
    };

    return (
        <div>
            <h2>Sales</h2>
            {/* Form for adding sales */}
            <button onClick={addSale}>Add Sale</button>
            <ul>
                {sales.map(sale => (
                    <li key={sale._id}>
                        {sale.sale_items.map(item => (
                            <div key={item._id}>{item.item.name} - {item.quantity}</div>
                        ))}
                        Total: {sale.total}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sales;
