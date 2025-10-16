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
    let assetSize = 0.225 * width * item.getSizeFactor();

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
                left: x + 'px',
                top: y + 'px',
                height: assetSize + 'px',
                width: assetSize + 'px',
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
        function updateSize() {
            if (ref.current) {
                setFrameSize([
                    ref.current.offsetWidth,
                    ref.current.offsetHeight
                ]);
            }
        }
        updateSize();

        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

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

function GalleryControls({ label, handleDelete, hideDelete }) {
    return (
        <div className="gallery-controls">
            <div className="gallery-label">{label}</div>
            {hideDelete ? '' : (
                <button className="gallery-delete" onClick={handleDelete}>
                    <img src={closeIcon}></img>
                </button>
            )}
        </div>
    );
}

export function GalleryRow({ frame, handleDeleteFrame, hideDelete }) {
    const label = frame.getLabel();

    return (
        <div className="gallery-row">
            <GalleryCanvas frame={frame} />
            <GalleryControls
                label={label}
                handleDelete={() => handleDeleteFrame(frame)}
                hideDelete={hideDelete}
            />
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

    const [userVisit, setUserVisit] = useState(null);

    useEffect(() => {
        function mockUserVisit() {
            const fakeNames = ['robbysmith', 'jenniferjohnson', 'sammywilson', 'jonathanrhodes'];
            const name = fakeNames[Math.floor(Math.random() * fakeNames.length)];

            setUserVisit(name);

            setTimeout(mockUserVisit, 5000 * Math.random());
        }
        setTimeout(mockUserVisit, 3000);
    }, []);

    function handleDeleteFrame(frame) {
        setFrames(frames.filter(f => f._id !== frame._id));
        frame.delete();
    }
    
    return (
        <main>
            <h1>Gallery</h1>
            <h2>Welcome back, <i>{ username}-san</i></h2>
            { userVisit ? (
                <div id="gallery-visit-indicator"><i>{userVisit}</i> just visited your gallery.</div>
            ) : ''}
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

