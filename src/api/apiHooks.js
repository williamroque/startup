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
            setAuthError(null);
            setAuthState(AuthState.Authenticated);
            setUsername(username);
        } else {
            setAuthError(response?.status);
        }

        return response?.status;
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
            setAuthError(null);
            setAuthState(AuthState.Authenticated);
            setUsername(username);
        } else {
            setAuthError(response?.status);
        }

        return response?.status;
    };

    const logout = async () => {
        const response = await fetch('/api/auth/logout', {
            method: 'delete',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        localStorage.removeItem('username');
        setAuthState(AuthState.Unauthenticated);
        setAuthError(null);
        setUsername(null);

        return response?.status;
    };

    return { username, authState, authError, login, create, logout };
}

function useGallery() {
    const [ frames, setFrames ] = useState(null);

    const getFrames = async username => {
        const response = await fetch(`/api/gallery/${username}`, {
            method: 'get',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        if (response?.status === 200) {
            return await response.json();
        }

        return null;
    };

    return { getFrames };
}

export { useLogin, useGallery };