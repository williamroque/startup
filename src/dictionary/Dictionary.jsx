import React from 'react';
import './Dictionary.css';

export default function Dictionary() {
    return (
        <section>
            <h2>Dictionary</h2>
            <ul className="dictionary-list">
                <li>
                    <a href="definition">
                        <span className="definition-character">石</span>
                        <span className="definition-label">Stone</span>
                    </a>
                </li>
                <li>
                    <a href="definition">
                        <span className="definition-character">家</span>
                        <span className="definition-label">House</span>
                    </a>
                </li>
                <li>
                    <a href="definition">
                        <span className="definition-character">水</span>
                        <span className="definition-label">Water</span>
                    </a>
                </li>
                <li>
                    <a href="definition">
                        <span className="definition-character">川</span>
                        <span className="definition-label">River</span>
                    </a>
                </li>
            </ul>
        </section>
    );
}
