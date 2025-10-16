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

    const foregroundFactor = 1.2;
    let assetSize = 110 * item.getSizeFactor();

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
            assetSize *= foregroundFactor;
            break;
        case 'bottom-middle':
            x += width / 2 - assetSize / 2;
            y += height - assetSize;
            assetSize *= foregroundFactor;
            break;
        case 'bottom-right':
            x += width - assetSize;
            y += height - assetSize;
            assetSize *= foregroundFactor;
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

function GalleryControls({ label, handleDelete }) {
    return (
        <div className="gallery-controls">
            <div className="gallery-label">{label}</div>
            <button className="gallery-delete" onClick={handleDelete}>
                <img src={closeIcon}></img>
            </button>
        </div>
    );
}

function GalleryRow({ frame, handleDeleteFrame }) {
    const label = frame.getLabel();

    return (
        <div className="gallery-row">
            <GalleryCanvas frame={frame} />
            <GalleryControls label={label} handleDelete={() => handleDeleteFrame(frame)} />
        </div>
    );
}

export default function Gallery({ username }) {
    const [frames, setFrames] = useState(() => {
        let frameData = JSON.parse(window.localStorage.getItem('gallery-frames')) || [];
        frameData = frameData.map(frame => {
            let items = {};

            for (const position in frame) {
                if (position !== 'id') {
                    const character = frame[position];
                    items[position] = new Item(fullDictionary.getCharacter(character));
                }
            }

            return new Frame(items, frame.id);
        });

        return frameData;
    });

    function handleDeleteFrame(frame) {
        setFrames(frames.filter(f => f._id !== frame._id));
        frame.delete();
    }
    
    return (
        <main>
            <h1>Gallery</h1>
            <h2>Welcome back, <i>{ username}-san</i></h2>
            <div id="gallery-visit-indicator"><i>robbysmith</i> just visited your gallery.</div>
            <section>
                {[...frames].reverse().map((frame, index) => {
                    return <GalleryRow
                        frame={frame}
                        key={index}
                        handleDeleteFrame={handleDeleteFrame}
                    />
                })}
            </section>
        </main>
    );
}

