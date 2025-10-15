import './Gallery.css';
import React from 'react';

import { Frame, Item } from '../data/galleryData';

import closeIcon from '../assets/icons/close.svg';

function GalleryCanvas({ frame }) {
    return <canvas></canvas>;
}

function GalleryControls({ label }) {
    return (
        <div className="gallery-controls">
            <div className="gallery-label">{label}</div>
            <button className="gallery-delete">
                <img src={closeIcon}></img>
            </button>
        </div>
    );
}

function GalleryRow({ frame }) {
    const label = frame.getLabel();

    return (
        <div className="gallery-row">
            <GalleryCanvas frame={frame} />
            <GalleryControls label={label} />
        </div>
    );
}

const samples = [
    new Frame({
        'top-left': new Item('river', '川'),
        'bottom-right': new Item('person', '人'),
    })
];

export default function Gallery({ username }) {
    return (
        <main>
            <h1>Gallery</h1>
            <h2>Welcome back, <i>{ username}-san</i></h2>
            <div id="gallery-visit-indicator"><i>robbysmith</i> just visited your gallery.</div>
            <section>
                <GalleryRow frame={samples[0]} />
            </section>
        </main>
    );
}

