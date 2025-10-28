import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 

import { GalleryRow } from '../gallery/Gallery';
import { useGallery } from '../api/apiHooks';

import arrowBack from '../assets/icons/arrow_back.svg';

export default function VisitGallery() {
    const navigate = useNavigate();
    const { user } = useParams();

    const { getFrames, frames } = useGallery();

    useEffect(() => {
        getFrames(user);
    }, []);

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

