import React, { useState } from 'react';
import Category from './Category';
import Item from './Item';

const Shop = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId); // Update the selected category
    };

    return (
        <div className="shop-container">
            <div className="category-section">
                <Category onSelectCategory={handleCategorySelect} />
            </div>
            <div className="item-section">
                <Item selectedCategory={selectedCategory} />
            </div>
        </div>
    );
};

export default Shop;
