import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthState from './authState';

import './Login.css';

export default function Login({ onCreate, onLogin, authError }) {
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
                            onLogin(username, password);
                        }}
                    >
                        Log in
                    </button>
                    <button
                        onClick={() => {
                            onCreate(username, password);
                        }}
                    >
                        Create account
                    </button>
                </div>
            </div>
        </main>
    );
}
