import { useState, useEffect, createContext  } from 'react'
import axiosClient from '../config/axios'

const AuthContext = createContext()
const AuthProvider = ({children}) => {

    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState({});
    const [alert, setAlert] = useState({});
    const [clean, setClean] = useState(false);

    useEffect(()=> {
        const authenticateUser = async () => {
            const token = localStorage.getItem('token');
            if(!token) {
                setLoading(false);
                return;
            }
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const {data} = await axiosClient('/users/profile', config);
                setAuth(data);
                
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({});
            }
            setLoading(false);
        }
         authenticateUser()
    }, [])

    const handleSetAlert = ({msg, error}) => {
        setAlert({
            msg,
            error
        })
        setTimeout(()=>{setAlert({})},3000);
    }

    const signOut = () => {
        localStorage.removeItem('token');
        setAuth({});
        setClean(true);
    }

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading,
                setLoading,
                signOut,
                alert,
                handleSetAlert,
                clean,
                setClean
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext