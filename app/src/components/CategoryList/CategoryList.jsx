import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryList.css';

function CategoryList() {
  const categories = ['Technology', 'Art', 'Music', 'Comics', 'Design', 'Food', 'Photography'];
  return (
    <div className='categories'>
      <ul className='category-list'>
        {categories.map((category) => (
          <li key={category}>
            <Link to={`/category/${category.toLowerCase()}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryList;
