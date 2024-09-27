import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Sale = () => {
    const [items, setItems] = useState([]);
    const [sales, setSales] = useState([]);
    const [saleItems, setSaleItems] = useState([{ item: '', quantity: 1 }]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:5000/items')
            .then(res => setItems(res.data))
            .catch(err => console.error(err));

        axios.get('http://localhost:5000/sales')
            .then(res => setSales(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleSaleItemChange = (index, e) => {
        const newSaleItems = saleItems.map((saleItem, i) => {
            if (i === index) {
                return { ...saleItem, [e.target.name]: e.target.value };
            }
            return saleItem;
        });
        setSaleItems(newSaleItems);
    };

    const handleAddSaleItem = () => {
        setSaleItems([...saleItems, { item: '', quantity: 1 }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/sales', {
            sale_items: saleItems,
            total_price: totalPrice
        })
            .then(res => setSales([...sales, res.data]))
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h2>Sales</h2>
            <ul>
                {sales.map(sale => (
                    <li key={sale._id}>
                        Sale: {sale.sale_items.map(si => (
                            <span key={si.item._id}>{si.item.name} (Quantity: {si.quantity}), </span>
                        ))} - Total: {sale.total_price}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                {saleItems.map((saleItem, index) => (
                    <div key={index}>
                        <select
                            name="item"
                            value={saleItem.item}
                            onChange={e => handleSaleItemChange(index, e)}
                        >
                            <option value="">Select Item</option>
                            {items.map(item => (
                                <option key={item._id} value={item._id}>{item.name}</option>
                            ))}
                        </select>
                        <input
                            type="number"
                            name="quantity"
                            value={saleItem.quantity}
                            onChange={e => handleSaleItemChange(index, e)}
                            placeholder="Quantity"
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddSaleItem}>Add Sale Item</button>
                <input
                    type="number"
                    value={totalPrice}
                    onChange={e => setTotalPrice(e.target.value)}
                    placeholder="Total Price"
                />
                <button type="submit">Submit Sale</button>
            </form>
        </div>
    );
};

export default Sale;
