import React from 'react';
import { Link } from 'react-router-dom';
import './DiscoverProjects.css';

export default function DiscoverProjects({ isOpen, onClose, categories }) {
    if (!isOpen) return null;

    return (
        <div>
            <div className='categories-modal'>
                <div className='categories-modal-content'>
                    <h1>Discover Categories</h1>
                    <button className='close-button' onClick={onClose}>
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-6 h-6'>
                            <path stroke-linecap='round' stroke-linejoin='round' d='M6 18L18 6M6 6l12 12' />
                        </svg>
                    </button>
                    <ul>
                        {categories.map((category) => (
                            <li key={category} className='discover-item'>
                                <Link to={`/category/${category}`}>{category}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    )
}