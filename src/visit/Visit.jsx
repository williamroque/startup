import React from 'react';
import './Visit.css';

export default function Visit() {
    return (
        <main>
            <h1>Visit</h1>
            <section>
                <ul className="visit-users-list">
                    <li><a href="/visit-gallery/robbysmith">robbysmith</a></li>
                    <li><a href="/visit-gallery/jenniferjohnson">jenniferjohnson</a></li>
                    <li><a href="/visit-gallery/sammywilson">sammywilson</a></li>
                    <li><a href="/visit-gallery/jonathanrhodes">jonathanrhodes</a></li>
                </ul>
            </section>
        </main>
    );
}
