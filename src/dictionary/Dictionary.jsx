import React from 'react';

export default function Dictionary() {
    return (
        <section>
            <h2>Dictionary</h2>
            <ul class="dictionary-list">
                <li>
                    <a href="definition">
                        <span class="definition-character">石</span>
                        <span class="definition-label">Stone</span>
                    </a>
                </li>
                <li>
                    <a href="definition">
                        <span class="definition-character">家</span>
                        <span class="definition-label">House</span>
                    </a>
                </li>
                <li>
                    <a href="definition">
                        <span class="definition-character">水</span>
                        <span class="definition-label">Water</span>
                    </a>
                </li>
                <li>
                    <a href="definition">
                        <span class="definition-character">川</span>
                        <span class="definition-label">River</span>
                    </a>
                </li>
            </ul>
        </section>
    );
}
