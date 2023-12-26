import axios from 'axios';
import { createContext, useEffect, useState } from 'react';


export const AuthContext = createContext({});

export function AuthContextProvider({ children }){
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);
    
    useEffect(() => {
        if(!user){
            axios.get('/api/users/profile').then(({data}) => {
                setUser(data);
                setReady(true);
            });
        }
    }, []);

    const logout = async() => {
        try {
            await axios.post('/api/users/logout');
        setUser(null);
        } catch (error) {
           console.error('Error logging out:', error); 
        }
    }

    return(
        <AuthContext.Provider value={{user, setUser, ready, logout}}>
            {children}
        </AuthContext.Provider>
    )
}