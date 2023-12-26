import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { AuthContext } from '../../context/AuthContext';
import DiscoverProjects from '../DiscoverProjects/DiscoverProjects';
import SearchBar from '../SearchBar/SearchBar';

export default function Header() {
    const { user } = useContext(AuthContext);
    const [isDiscoverOpen, setDiscoverOpen] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 800);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const toggleDiscover = () => {
        setDiscoverOpen(!isDiscoverOpen);
    };


    const toggleHamburger = () => {
        setShowOptions(!showOptions);
    };

    return (
        <div>
            <header className='header-container'>
                <div className='header-left-section'>
                    <Link to={'/'} className='header-logo'>
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'>
                            <path stroke-linecap='round' stroke-linejoin='round' d='M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25' />
                        </svg>
                        <span className='title'>WeThePeople</span>
                    </Link>
                </div>
                <SearchBar />
                <div className='header-right-section'>
                    <div className='hamburger-icon' onClick={toggleHamburger}>
                        <div className={`bar ${showOptions ? 'clicked' : ''}`}></div>
                        <div className={`bar ${showOptions ? 'clicked' : ''}`}></div>
                        <div className={`bar ${showOptions ? 'clicked' : ''}`}></div>
                    </div>
                </div>

                {isMobile && showOptions && (
                    <div className='options-container'>
                        <span onClick={toggleDiscover} className='discover-text'>Discover</span>
                        {user ? (
                            <Link to={'/profile'} className='loginIcon-container'>
                                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='loginIcon-lines'>
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
                                </svg>
                                <div className='loginIcon-background'>
                                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'>
                                        <path fillRule='evenodd' d='M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z' clipRule='evenodd' />
                                    </svg>
                                </div>
                            </Link>
                        ) : (
                            <Link to={'/login'}><button className='login-button'>Log in</button></Link>
                        )}
                    </div>
                )}

                <div className='header-options'>
                    <span onClick={toggleDiscover} className='discover-text'>Discover</span>
                    {user ? (
                        <Link to={'/profile'} className='loginIcon-container'>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='loginIcon-lines'>
                                <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
                            </svg>
                            <div className='loginIcon-background'>
                                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'>
                                    <path fillRule='evenodd' d='M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z' clipRule='evenodd' />
                                </svg>
                            </div>
                        </Link>
                    ) : (
                        <Link to={'/login'}><button className='login-button'>Log in</button></Link>
                    )}
                </div>

                <DiscoverProjects
                    isOpen={isDiscoverOpen}
                    onClose={toggleDiscover}
                    categories={['Technology', 'Art', 'Music', 'Comics', 'Design', 'Food', 'Photography']}
                />
            </header>

        </div>
    );
}

