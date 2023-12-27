import './LoginPage.css'
import { Link, Navigate } from 'react-router-dom'
import Layout from '../../components/Layout/Layout.jsx'
import { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext.js';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUser } = useContext(AuthContext);

    async function handleLogin(ev) {
        ev.preventDefault();
        try {

            const response = await axios.post('api/users/login', { email, password });
            toast.success('Login Successful');
            setUser(response.data);
            setRedirect(true);
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.errors ? error.response.data.errors[0].msg : error.response.data.error);
            } else if (error.request) {
                toast.error('No response received from the server');
            } else {
                toast.error('An unexpected error occurred.');
            }
        } 
    }
        

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div>
            <Layout>
                <div className='login-container'>
                    {loading ? (
                        <LoadingIcon />
                    ) : (
                        <div className='login-border'>

                            <h1>Login</h1>
                            <form className='login-form' onSubmit={handleLogin}>
                                <input className='login-input' type='email' placeholder='Email' value={email} onChange={ev => setEmail(ev.target.value)} />
                                <input className='login-input' type='password' placeholder='Password' value={password} onChange={ev => setPassword(ev.target.value)} />
                                <button>Login</button>
                                <div className='login-subtext'>Don't have an account yet? <Link to={'/signup'} className='login-link'>Signup Now</Link></div>
                            </form>


                        </div>
                    )};
                </div>
            </Layout>
        </div>
    )
};

