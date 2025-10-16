import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Studio.css';
import Dictionary from '../dictionary/Dictionary';
import { GalleryCanvas } from '../gallery/Gallery';
import { Frame } from '../data/galleryData';
import { fullDictionary } from '../data/dictionaryData';


function InputBox({ handleChange, position }) {
    return (
        <select
            className="studio-input-box"
            onChange={e => {
                handleChange(e.target.value, position);
            }}
        >
            <option></option>
            {fullDictionary.getCharacters().map((character, index) => {
                return <option key={index}>{character.getCharacter()}</option>;
            })}
        </select>
    );
}

function InputTable({ handleChange }) {
    return (
        <div className="studio-input-table">
            <InputBox handleChange={handleChange} position="top-left" />
            <InputBox handleChange={handleChange} position="top-middle" />
            <InputBox handleChange={handleChange} position="top-right" />
            <InputBox handleChange={handleChange} position="bottom-left" />
            <InputBox handleChange={handleChange} position="bottom-middle" />
            <InputBox handleChange={handleChange} position="bottom-right" />
        </div>
    );
}

export default function Studio() {
    const [ frame, setFrame ] = useState(new Frame());

    const navigate = useNavigate();

    function handleChange(characterName, position) {
        const character = fullDictionary.getCharacter(characterName);
        setFrame(frame.swapCharacter(character, position));
    }

    return (
        <main>
            <h1>Studio</h1>
            <section>
                <GalleryCanvas frame={frame} />
                <InputTable rowCount={2} colCount={3} handleChange={handleChange} />
                <button
                    className="studio-save-button"
                    onClick={() => {
                        frame.save();
                        navigate('/gallery');
                        window.scrollTo(0, 0);
                    }}
                >
                    Save to Gallery
                </button>
            </section>
            <Dictionary dictionary={fullDictionary} />
        </main>
    );
}
