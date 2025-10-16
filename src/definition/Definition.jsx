import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { fullDictionary } from '../data/dictionaryData';
import useImage from '../assets/useImage';

import './Definition.css';

import arrowBack from '../assets/icons/arrow_back.svg';

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
    return (
        <section className="stroke-order-section">
            <video
                src="https://media.kanjialive.com/kanji_animations/kanji_mp4/otozu(reru)_00.mp4"
                autoPlay
                muted
                loop
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
