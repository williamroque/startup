import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthState from './authState';

import './Login.css';

export default function Login({ onAuthStateChange }) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const navigate = useNavigate();

    return (
        <main>
            <h1>Sign in</h1>
            <div id="form">
                <input
                    placeholder="Username"
                    type="text"
                    onChange={e => {
                        setUsername(e.target.value);
                    }}
                />
                <input
                    placeholder="Password"
                    type="password"
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                />
                <p>Incorrect username or password.</p>
                <p>An account with that username already exists.</p>
                <div className="form-buttons">
                    <button
                        onClick={() => {
                            localStorage.setItem('username', username);
                            localStorage.setItem('password', password);

                            onAuthStateChange(username, AuthState.Authenticated);

                            navigate('/gallery');
                        }}
                    >
                        Log in
                    </button>
                    <button>Create account</button>
                </div>
            </div>
        </main>
    );
}
