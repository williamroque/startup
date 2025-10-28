import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { fullDictionary } from '../data/dictionaryData';
import useImage from '../assets/useImage';

import './Definition.css';

import arrowBack from '../assets/icons/arrow_back.svg';
import { useStrokeOrder } from '../api/apiHooks';

function ReturnButton() {
    const navigate = useNavigate();

    return (
        <button
            className="return-button"
            onClick={() => navigate(-1)}
        >
            <img src={arrowBack} />
        </button>
    );
}

function CharacterDefinition({ character }) {
    const { loading, image } = useImage(character.getID());

    return (
        <section>
            <div className="definition-container">
                {loading ? '' : (
                    <img
                        className="definition-image"
                        src={image}
                    />
                )}
                <span className="definition-image-label">
                    {character.getCharacter()}
                </span>
            </div>
            <span className="definition-translation-label">
                {character.getName()}
            </span>
        </section>
    );
}

function StrokeOrder({ character }) {
    const { videoURL, getVideoURL } = useStrokeOrder();

    useEffect(() => {
        getVideoURL(character.getCharacter());
    }, []);

    return (
        <section className="stroke-order-section">
            <video
                src={videoURL}
                autoPlay
                muted
                controls
            ></video>
        </section>
    );
}

export default function Definition() {
    const { character } = useParams();
    const characterObject = fullDictionary.getCharacter(character);

    return (
        <main>
            <ReturnButton />
            <CharacterDefinition character={characterObject} />
            <StrokeOrder character={characterObject} />
        </main>
    );
}
