import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './UserProfile.css'
import AccountNav from '../../components/AccountNav/AccountNav';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import PasswordReset from '../../components/PasswordReset/PasswordReset';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function UserProfile() {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [showPasswordReset, setShowPasswordReset] = useState(false);
    const [redirect, setRedirect] = useState('');

    const { logout } = useContext(AuthContext);

    useEffect(() => {
        axios.get('/api/users/user-details')
            .then(response => {
                const { data } = response;
                setName(data.name);
                setEmail(data.email);
                setBio(data.bio);
            })
            .catch(error => {
                console.error('Error fetching user Details:', error);
            })
            .finally(
                setLoading(false)
            );
    }, []);

    const handleLogout = async (ev) => {
        try {
            const response = await axios.post('/api/users/logout');
            await logout();
            toast.success('Logout Successfull');
            setRedirect(true);
        } catch (error) {
            console.error('Error Logging out:', error);
        }
    }

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        try {
            const userData = {
                name, email, bio,
            }
            await axios.put('/api/users/edit/user-details', { ...userData });
            setRedirect(true);
            toast.success('User Details saved succesfully');
        } catch (error) {
            console.error('Error updating user details:', error);
        }
    }


    const handleOpenPasswordReset = () => {
        setShowPasswordReset(true);
    };


    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div>
            <Layout>
                <AccountNav />
                <div className='user-profile-container'>
                    {loading ? (
                        <LoadingIcon />
                    ) : (
                        <>
                            <form className='user-profile-form' onSubmit={handleSubmit}>
                                <div className='left-section'>
                                    <label htmlFor='name' className='user-profile-label'>Name: </label>
                                    <input
                                        type='text'
                                        className='userProfile-input'
                                        value={name}
                                        onChange={ev => setName(ev.target.value)} />
                                    <br />
                                    <label htmlFor='email' className='user-profile-label'>Email: </label>
                                    <input
                                        type='email'
                                        className='userProfile-input'
                                        value={email}
                                        onChange={ev => setEmail(ev.target.value)} />
                                    <br />
                                    <label htmlFor='bio' className='user-profile-label'>Bio:</label>
                                    <textarea
                                        name='bio'
                                        cols='10'
                                        rows='5'
                                        className='userProfile-input'
                                        value={bio}
                                        onChange={ev => setBio(ev.target.value)} />
                                    <br />

                                </div>
                                <div className='right-section'>
                                    <br />
                                    <button className='password-reset-btn'>Save profile details</button>
                                    <button type='button' className='password-reset-btn' onClick={handleOpenPasswordReset}>Password reset</button>
                                </div>
                            </form>
                            <div className='logout-container'>
                                <button className='logout-btn' onClick={handleLogout}>Logout</button>
                            </div>
                        </>
                    )}

                </div>
                {showPasswordReset && (
                    <PasswordReset
                        handleClosePasswordReset={() => setShowPasswordReset(false)}
                    />
                )}
            </Layout>
        </div>
    )
}