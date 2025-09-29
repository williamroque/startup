import React from 'react';
import Dictionary from '../dictionary/Dictionary';

export default function Discover() {
    return (
        <main>
            <h1>Discover</h1>
            <section>
                <canvas></canvas>
                <div className="discover-box">
                    <button className="discover-button">
                        Insert <span className="discover-button-span">水</span>
                    </button>
                    <div className="discover-pedestals">
                        <div className="discover-pedestal">水</div>
                        <div className="discover-pedestal"></div>
                    </div>
                </div>
            </section>
            <Dictionary />
        </main>
    );
}
