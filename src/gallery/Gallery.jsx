import React from 'react';

export default function Gallery() {
    return (
        <main>
            <h1>Gallery</h1>
            <h2>Welcome back, <i>wroque-san</i></h2>
            <div id="gallery-visit-indicator"><i>robbysmith</i> just visited your gallery.</div>
            <section>
                <div className="gallery-row">
                    <canvas></canvas>
                    <div className="gallery-controls">
                        <div className="gallery-label">家石水</div>
                        <button className="gallery-delete">
                            <img src="./assets/icons/close.svg"></img>
                        </button>
                    </div>
                </div>
                <div className="gallery-row">
                    <canvas></canvas>
                    <div className="gallery-controls">
                        <div className="gallery-label">川人</div>
                        <button className="gallery-delete">
                            <img src="./assets/icons/close.svg"></img>
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}

