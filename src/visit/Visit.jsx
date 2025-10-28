import React, { useEffect, useState } from 'react';
import './Visit.css';
import { getUserList } from '../api/apiHooks';

export default function Visit({ username }) {
    const [ users, setUsers ] = useState([]);

    useEffect(() => {
        getUserList().then(users => {
            setUsers(users);
        });
    }, []);


    return (
        <main>
            <h1>Visit</h1>
            <section>
                <ul className="visit-users-list">
                    {users.filter(user => user !== username).map(user => {
                        return <li key={user}><a href={'/visit-gallery/' + user}>{user}</a></li>;
                    })}
                </ul>
            </section>
        </main>
    );
}
