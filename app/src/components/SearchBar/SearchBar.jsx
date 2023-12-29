import React, { useEffect, useState } from 'react';
import './SearchBar.css';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            const response = await axios.get(`/autocomplete?query=${query}`);
            setSuggestions(response.data);
        };

        if (query.length > 2) {
            fetchSuggestions();
        } else {
            setSuggestions([]);
        }
    }, [query]);

    const handleChange = (event) => {
        setQuery(event.target.value);
    }

    return (
        <div className='search-container'>
            <input type='text' className='inputBox' placeholder='Search...' value={query} onChange={handleChange} />
            <span className='search-icon'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'>
                    <path stroke-linecap='round' stroke-linejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
                </svg>
            </span>
            {suggestions.length > 0 && (
                <div className='suggestion-container'>
                    <ul className='suggestions-list'>
                        {suggestions.length > 0 && (
                            <ul className='suggestions-list'>
                                {suggestions.map((suggestion) => (
                                    <Link to={`/project/${suggestion._id}`}>
                                    <li key={suggestion._id}  className='suggestion-item'>
                                        <img src={`https://wethepeople-project.onrender.com/uploads/${suggestion.images[0]}`} alt={suggestion.title} className='suggestion-image' />
                                        <span className='suggestion-title'>{suggestion.title}</span>
                                    </li>
                                    </Link>
                                ))}
                            </ul>
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}