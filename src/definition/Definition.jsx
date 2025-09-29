import React from 'react';

export default function Definition() {
    return (
        <main className="definition-main">
            <button className="return-button" onClick={() =>  window.location.href = '/studio'}>
                <img src="./assets/icons/arrow_back.svg" />
            </button>
            <section>
                <div className="definition-container">
                    <img className="definition-image" src="./assets/representations/stone.png" />
                    <span className="definition-image-label">石</span>
                </div>
                <span className="definition-translation-label">Stone</span>
            </section>
            <section>
                <video src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" controls width="300"></video>
            </section>
        </main>
    );
}

