import './Gallery.css';
import React, { useRef, useState, useEffect } from 'react';

import { Frame, Item } from '../data/galleryData';
import { Character, fullDictionary } from '../data/dictionaryData';

import closeIcon from '../assets/icons/close.svg';

const positionNudges = {
    'top-left': [0.04, 0.02],
    'top-middle': [0, 0.2],
    'top-right': [-0.1, 0.1],
    'bottom-left': [0.1, -0.1],
    'bottom-middle': [0.02, -0.2],
    'bottom-right': [-0.07, -0.15]
};


function GalleryItem({ position, item, frameSize }) {
    const { loading, image } = item.getImage();

    const [ width, height ] = frameSize;

    const assetSize = 110;

    const positionNudge = positionNudges[position];

    let [ x, y ] = [
        positionNudge[0] * width,
        positionNudge[1] * height
    ];

    switch (position) {
        case 'top-middle':
            x += width / 2 - assetSize / 2;
            break;
        case 'top-right':
            x += width - assetSize;
            break;
        case 'bottom-left':
            y += height - assetSize;
            break;
        case 'bottom-middle':
            x += width / 2 - assetSize / 2;
            y += height - assetSize;
            break;
        case 'bottom-right':
            x += width - assetSize;
            y += height - assetSize;
            break;
    }

    return loading ? '' : (
        <div
            className="frame-item"
            style={{
                left: x,
                top: y,
                height: assetSize,
                width: assetSize,
            }}
        >
            <img
                src={image}
            />
        </div>
    );
}

export function GalleryCanvas({ frame }) {
    const ref = useRef(null);
    const [frameSize, setFrameSize] = useState([0, 0]);

    useEffect(() => {
        setFrameSize([
            ref.current.offsetWidth,
            ref.current.offsetHeight
        ]);
    }, [ref.current]);

    return (
        <div className="frame" ref={ref}>
            { frame.getItems().map(([ position, item ], index) => {
                return <GalleryItem
                    key={index}
                    position={position}
                    item={item}
                    frameSize={frameSize}
                />;
            }) }
            <div className="texture-overlay"></div>
        </div>
    );
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

function sampleItem(character) {
    return new Item(fullDictionary.getCharacter(character));
}

const samples = [
    new Frame({
        'bottom-middle': sampleItem('川'),
        'top-middle': sampleItem('家'),
        'bottom-left': sampleItem('石'),
        'top-right': sampleItem('空'),
        'bottom-right': sampleItem('人'),
    }),
    new Frame({
        'bottom-middle': sampleItem('滝'),
        'bottom-left': sampleItem('木'),
        'top-right': sampleItem('水'),
    })
];

export default function Gallery({ username }) {
    return (
        <main>
            <h1>Gallery</h1>
            <h2>Welcome back, <i>{ username}-san</i></h2>
            <div id="gallery-visit-indicator"><i>robbysmith</i> just visited your gallery.</div>
            <section>
                {samples.map((frame, index) => {
                    return <GalleryRow frame={frame} key={index} />
                })}
            </section>
        </main>
    );
}

