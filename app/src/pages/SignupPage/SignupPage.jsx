import './SignupPage.css'
import { Link, Navigate } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import { useState } from 'react';
import axios from 'axios';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function registerUser(ev) {
        setLoading(true);
        ev.preventDefault();
        try {
            await axios.post('api/users/signup', {
                name,
                email,
                password
            })
            toast.success('Registration Successful');
            setRedirect(true);
        } catch (error) {
            toast.error(error.response.data.errors ? error.response.data.errors[0].msg : error.response.data.error);
        }
        setLoading(false);
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div>
            <Layout>
                <div className='signup-container'>
                    {loading ? (
                        <LoadingIcon />
                    ) : (
                        <div className='signup-border'>
                            <h1 className>Sign up</h1>
                            <form className='signup-form' onSubmit={registerUser}>
                                <input type='text' placeholder='Name' value={name} onChange={ev => setName(ev.target.value)} />
                                <input type='email' placeholder='Email' value={email} onChange={ev => setEmail(ev.target.value)} />
                                <input type='password' placeholder='Password' value={password} onChange={ev => setPassword(ev.target.value)} />
                                <button>Create account</button>
                                <div className='signup-subtext'>Have an account? <Link to={'/login'} className='signup-link'>Login Now</Link></div>
                            </form>
                        </div>
                    )}

                </div>
            </Layout>
        </div>
    )
}

