import React from 'react';
import './Login.css';

export default function Login() {
    return (
        <main>
            <h1>Sign in</h1>
            <form>
                <input placeholder="Username" type="text" />
                <input placeholder="Password" type="password" />
                <p>Incorrect username or password.</p>
                <p>An account with that username already exists.</p>
                <div className="form-buttons">
                    <button>Log in</button>
                    <button>Create account</button>
                </div>
            </form>
        </main>
    );
}
