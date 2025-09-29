import React from 'react';

import './Studio.css';
import Dictionary from '../dictionary/Dictionary';

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
            <Dictionary />
        </main>
    );
}
