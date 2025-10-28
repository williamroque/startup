import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Studio.css';
import Dictionary from '../dictionary/Dictionary';
import { GalleryCanvas } from '../gallery/Gallery';
import { Frame } from '../data/galleryData';
import { UserDictionaryContext } from '../data/dictionaryData';

import { useGallery } from '../api/apiHooks';


function InputBox({ handleChange, position }) {
    const { userDictionary } = useContext(UserDictionaryContext);
    const [ inputValue, setInputValue ] = useState(null);

    return (
        <div className="studio-input-box">
            <div className="studio-input-select-text">
                {inputValue}
            </div>
            <select
                className="studio-input-select"
                onChange={e => {
                    setInputValue(e.target.value);
                    handleChange(e.target.value, position);
                }}
            >
                <option></option>
                {userDictionary.getCharacters().map((character, index) => {
                    return <option key={index}>{character.getCharacter()}</option>;
                })}
            </select>
        </div>
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
    const { addFrame } = useGallery();

    const navigate = useNavigate();
    const { userDictionary } = useContext(UserDictionaryContext);

    function handleChange(characterName, position) {
        const character = userDictionary.getCharacter(characterName);
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
                        addFrame(frame);
                        navigate('/gallery');
                        window.scrollTo(0, 0);
                    }}
                >
                    Save to Gallery
                </button>
            </section>
            <Dictionary dictionary={userDictionary} />
        </main>
    );
}
