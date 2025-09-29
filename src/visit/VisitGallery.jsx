import React from 'react';

export default function VisitGallery() {
    return (
        <main>
            <button className="return-button" onClick={() => window.location.href = 'visit'}>
                <img src="./assets/icons/arrow_back.svg" />
            </button>
            <h1>Gallery</h1>
            <h2>by <i>robbysmith</i></h2>
            <section>
                <div className="gallery-row">
                    <canvas></canvas>
                    <div className="gallery-controls">
                        <div className="gallery-label">家石水</div>
                    </div>
                </div>
                <div className="gallery-row">
                    <canvas></canvas>
                    <div className="gallery-controls">
                        <div className="gallery-label">川人</div>
                    </div>
                </div>
            </section>
        </main>
    );
}

