import { useState, useEffect } from 'react';
import AuthState from '../login/authState';

function useLogin() {
    const [ username, setUsername ] = useState(
        localStorage.getItem('username')
    );
    const [ authState, setAuthState ] = useState(
        username ? AuthState.Authenticated : AuthState.Unauthenticated
    );
    const [ authError, setAuthError ] = useState(null);

    const login = async (username, password) => {
        const response = await fetch('/api/auth/login', {
            method: 'post',
            body: JSON.stringify({ username: username, password: password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        if (response?.status === 200) {
            localStorage.setItem('username', username);
            setAuthState(AuthState.Authenticated);
            setAuthError(null);
        } else {
            const body = await response.json();
            setAuthError(body.msg);
        }
    };

    const create = async (username, password) => {
        const response = await fetch('/api/auth/create', {
            method: 'post',
            body: JSON.stringify({ username: username, password: password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        if (response?.status === 200) {
            localStorage.setItem('username', username);
            setAuthState(AuthState.Authenticated);
            setAuthError(null);
        } else {
            const body = await response.json();
            setAuthError(body.msg);
        }
    };

    const logout = async () => {
        const response = await fetch('/api/auth/logout', {
            method: 'delete',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        localStorage.setItem('username', undefined);
        setAuthState(AuthState.Unauthenticated);
        setAuthError(null);
    };

    return { username, authState, authError, login, create, logout };
}

export { useLogin };