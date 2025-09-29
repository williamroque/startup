import React from 'react';
import './Studio.css';

export default function Studio() {
    return (
        <main>
            <h1>Studio</h1>
            <section>
                <canvas></canvas>
                <div class="studio-input-table">
                    <div class="studio-input-row">
                        <div class="studio-input-box">1</div>
                        <div class="studio-input-box">2</div>
                        <div class="studio-input-box">家</div>
                    </div>
                    <div class="studio-input-row">
                        <div class="studio-input-box">石</div>
                        <div class="studio-input-box">5</div>
                        <div class="studio-input-box">水</div>
                    </div>
                </div>
            </section>
            <section>
                <h2>Dictionary</h2>
                <ul class="dictionary-list">
                    <li>
                        <a href="definition.html">
                            <span class="definition-character">石</span>
                            <span class="definition-label">Stone</span>
                        </a>
                    </li>
                    <li>
                        <a href="definition.html">
                            <span class="definition-character">家</span>
                            <span class="definition-label">House</span>
                        </a>
                    </li>
                    <li>
                        <a href="definition.html">
                            <span class="definition-character">水</span>
                            <span class="definition-label">Water</span>
                        </a>
                    </li>
                    <li>
                        <a href="definition.html">
                            <span class="definition-character">川</span>
                            <span class="definition-label">River</span>
                        </a>
                    </li>
                </ul>
            </section>
        </main>
    );
}
