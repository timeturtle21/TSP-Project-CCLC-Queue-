import {useState, useEffect} from 'react';

const useLogin = () => {
    const[loggedIn, setLoggedIn] = useState(() => {
        const isLogged = localStorage.getItem('isLoggedIn');
        return isLogged === 'true';
    });

    useEffect(() => {
        localStorage.setItem('isLoggedIn', loggedIn);
    }, [loggedIn]);

    return [loggedIn, setLoggedIn];
};

export default useLogin;
