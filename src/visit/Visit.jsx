import React, { useEffect, useState } from 'react';

import './Visit.css';
import Tip from '../tip/Tip';

import { getUserList } from '../api/apiHooks';

export default function Visit({ username, logout }) {
    const [ users, setUsers ] = useState([]);

    useEffect(() => {
        getUserList(logout).then(users => {
            setUsers(users);
        });
    }, []);


    return (
        <main>
            <h1>Visit</h1>
            <Tip tipID="explain-visit" />
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
