import React from 'react';

import './Dictionary.css';

import Tip from '../tip/Tip';

function DictionaryEntry({ character }) {
    return (
        <li>
            <a href={`definition/${character.getCharacter()}`}>
                <span className="definition-character">{character.getCharacter()}</span>
                <span className="definition-label">{character.getName()}</span>
            </a>
        </li>
    );
}

function DictionaryList({ dictionary }) {
    const characters = dictionary.getCharacters();

    return (
        <ul className="dictionary-list">
            {characters.reverse().map((character, index) => {
                return <DictionaryEntry
                    key={index}
                    character={character}
                />;
            })}
        </ul>
    );
}

export default function Dictionary({ dictionary }) {
    return (
        <section>
            <h2>Dictionary</h2>
            <Tip tipID="explain-dictionary" />
            <DictionaryList dictionary={dictionary} />
        </section>
    );
}
