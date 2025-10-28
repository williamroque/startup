import React from 'react';
import { useState } from 'react';

import './Login.css';

export default function Login({ onCreate, onLogin, authError }) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

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

                {authError === 401 ? (
                    <p>Incorrect username or password.</p>
                ) : authError === 409 ? (
                    <p>An account with that username already exists.</p>
                ) : ''}

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
