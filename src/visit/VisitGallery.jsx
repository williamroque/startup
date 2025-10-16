import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 

import { GalleryRow } from '../gallery/Gallery';
import { Item, Frame } from '../data/galleryData';
import { fullDictionary } from '../data/dictionaryData';

import arrowBack from '../assets/icons/arrow_back.svg';

export default function VisitGallery() {
    const navigate = useNavigate();
    const { user } = useParams();

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

    return (
        <main>
            <button
                className="return-button"
                onClick={() => {
                    navigate('/visit');
                }}>
                <img src={ arrowBack } />
            </button>
            <h1>Gallery</h1>
            <h2>by <i>{user}</i></h2>
            <section>
                {[...frames].reverse().map((frame, index) => {
                    return <GalleryRow
                        frame={frame}
                        hideDelete={true}
                        key={index}
                    />
                })}
            </section>
        </main>
    );
}

