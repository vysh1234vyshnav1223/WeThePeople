import { useState, useContext } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import './PasswordReset.css';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function PasswordReset( {handleClosePasswordReset} ){
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { logout } = useContext(AuthContext);



    const handlePasswordReset = async () => {
        try {
            const response = await axios.put('/api/users/change-password', {
                currentPassword, newPassword, confirmNewPassword
            });

            await logout();
            toast.success('Password reset successfull');
            setRedirect(true);     
        } catch (error) {
            toast.error(error.response.data.errors ? error.response.data.errors[0].msg : error.response.data.error);
        }

    }

    if (redirect) {
        return <Navigate to={'/login'} />
    }

    return(
        <div>
             
                <div className='password-reset-popup'>
                    <div className='password-reset-content'>
                        <span className='close' onClick={handleClosePasswordReset}>&times;</span>

                        <h2>Change Password</h2>
                        <label htmlFor='currentPassword'>Current Password:</label>
                        <input
                            type='password'
                            id='currentPassword'
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />

                        <label htmlFor='newPassword'>New Password:</label>
                        <input
                            type='password'
                            id='newPassword'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />

                        <label htmlFor='confirmNewPassword'>Confirm New Password:</label>
                        <input
                            type='password'
                            id='confirmNewPassword'
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />
                        <button onClick={handlePasswordReset}>Reset Password</button>

                    </div>
                </div>
        </div>
    )
}