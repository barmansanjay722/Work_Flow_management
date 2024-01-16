import React, { useEffect, useState } from 'react'
import AuthContext from './AuthContext';
import localStorageStore from '../../../utils/localStorageStore';
const AuthProvider = ({children}) => {
    const [data, setdata] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [authenticated, setAuthenticated] = useState(localStorage.getItem('token') !== null);
    const [role, setRole] = useState(localStorage.getItem('Role'));
    const [imageUrl, setImageUrl] = useState(localStorage.getItem('userImageUrl'));
    const [loginUserId, setLoginUserId] = useState(localStorage.getItem('loginUserId'));
    const [requestAccess, setRequestAccess] = useState(false);
    const [alreadyRequestedAccess, setAlreadyRequestedAccess] = useState(false);
    
    const checkUserToken = () => {
        const userToken = localStorage.getItem('token');
        if (!userToken || userToken === 'undefined') {
            localStorage.removeItem('token')
            setAuthenticated(false);
        } else {
            setAuthenticated(true);
        }
        return true
    }

    useEffect(() => {
        checkUserToken();
    }, [authenticated]);

    const loginAuth = () => {
        setAuthenticated(true);
    }

    const logoutAuth = () => {
        setRole(null);
        setAuthenticated(false);
        localStorage.removeItem('token');
        localStorageStore.resetDefaultTemplate();
    }
    
    return (
        <AuthContext.Provider value={{authenticated, data, setdata, token, setToken, loginUserId, setLoginUserId, imageUrl, setImageUrl, checkUserToken, loginAuth, logoutAuth, role, setRole, requestAccess, setRequestAccess, alreadyRequestedAccess, setAlreadyRequestedAccess}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider
