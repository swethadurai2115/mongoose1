import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Sale.css'; // Import the CSS file

const Sale = () => {
    const [items, setItems] = useState([]);
    const [sales, setSales] = useState([]);
    const [saleItems, setSaleItems] = useState([{ item: '', quantity: 1 }]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        // Fetch items and sales data from the server
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
            .then(res => {
                setSales([...sales, res.data]);
                // Reset sale items and total price after submission
                setSaleItems([{ item: '', quantity: 1 }]);
                setTotalPrice(0);
            })
            .catch(err => console.error(err));
    };

    // Handle delete sale function
    const handleDeleteSale = (saleId) => {
        axios.delete(`http://localhost:5000/sales/${saleId}`)
            .then(() => {
                // Update the sales state after deleting
                setSales(sales.filter(sale => sale._id !== saleId));
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="sale-container">
            <h2 className="sale-title">Sales</h2>

            {/* Form for selecting items and total price - This is now at the top */}
            <form onSubmit={handleSubmit} className="sale-form">
                {saleItems.map((saleItem, index) => (
                    <div key={index} className="sale-form-group">
                        <select
                            name="item"
                            value={saleItem.item}
                            onChange={e => handleSaleItemChange(index, e)}
                            className="sale-select"
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
                            className="sale-input"
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddSaleItem} className="sale-button">
                    Add Sale Item
                </button>
                <input
                    type="number"
                    value={totalPrice}
                    onChange={e => setTotalPrice(e.target.value)}
                    placeholder="Total Price"
                    className="sale-input"
                />
                <button type="submit" className="sale-submit-button">Submit Sale</button>
            </form>

            {/* List of sales */}
            <ul className="sale-list">
                {sales.map(sale => (
                    <li key={sale._id} className="sale-item">
                        Sale: {sale.sale_items.map(si => (
                            <span key={si.item._id} className="sale-item-detail">
                                {si.item.name} (Quantity: {si.quantity}),
                            </span>
                        ))}
                        - Total: ${sale.total_price}

                        {/* Add the delete button here */}
                        <button 
                            className="sale-delete-button" 
                            onClick={() => handleDeleteSale(sale._id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sale;
