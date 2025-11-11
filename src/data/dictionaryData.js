import { createContext } from 'react';

export class Character {
    constructor(id, name, character, combination, sizeFactor) {
        this._id = id;
        this._name = name;
        this._character = character;
        this._combination = combination;
        this._sizeFactor = sizeFactor;
    }

    getID() {
        return this._id;
    }

    getCharacter() {
        return this._character;
    }

    getName() {
        return this._name;
    }

    getSizeFactor() {
        return this._sizeFactor;
    }

    testCombination(a, b) {
        if (!this._combination) return false;

        return (
            (this._combination[0] === a && this._combination[1] === b) ||
            (this._combination[1] === a && this._combination[0] === b)
        );
    }
}

export class DictionaryData {
    constructor(characters) {
        this._characters = characters;

        if (!this._characters) {
            this._characters = {};
        }
    }

    learnCharacter(characterObject) {
        this._characters[characterObject.getCharacter()] = characterObject;
        return new DictionaryData(this._characters);
    }

    getCharacter(character) {
        return this._characters[character] || null;
    }

    getCharacters() {
        return Object.values(this._characters);
    }

    getPlainCharacters() {
        return Object.keys(this._characters);
    }

    findCombination(a, b) {
        for (const character of Object.values(this._characters)) {
            if (character.testCombination(a, b)) {
                return character;
            }
        }
    }
}

export const fullDictionary = new DictionaryData({
    '石': new Character('stone', 'Stone', '石', null, 0.8),
    '水': new Character('water', 'Water', '水', null, 1),
    '川': new Character('river', 'River', '川', ['石', '水'], 1.4),
    '滝': new Character('waterfall', 'Waterfall', '滝', ['水', '水'], 1),
    '木': new Character('wood', 'Wood', '木', null, 1),
    '橋': new Character('bridge', 'Bridge', '橋', ['木', '水'], 1.4),
    '土': new Character('soil', 'Soil', '土', null, 0.8),
    '生': new Character('life', 'Life', '生', ['水', '土'], 1),
    '人': new Character('person', 'Person', '人', ['生', '生'], 1.1),
    '家': new Character('house', 'House', '家', ['人', '木'], 1),
    '寺': new Character('temple', 'Buddhist Temple', '寺', ['家', '木'], 1),
    '金': new Character('gold', 'Gold', '金', null, 1),
    '城': new Character('castle', 'Castle', '城', ['家', '金'], 1.2),
    '火': new Character('fire', 'Fire', '火', null, 1),
    '車': new Character('car', 'Car', '車', ['火', '金'], 1),
    '草': new Character('grass', 'Grass', '草', ['土', '木'], 1),
    '花': new Character('flower', 'Flower', '花', ['草', '金'], 1),
    '空': new Character('sky', 'Sky', '空', ['火', '水'], 1.1),
    '鳥': new Character('bird', 'Bird', '鳥', ['空', '生'], 1),
    '竜': new Character('dragon', 'Dragon', '竜', ['鳥', '火'], 1),
    '田': new Character('rice', 'Rice Field', '田', ['土', '人'], 1)
});

export const defaultUserDictionary = new DictionaryData({
    '石': new Character('stone', 'Stone', '石', null, 1),
    '水': new Character('water', 'Water', '水', null, 1),
    '木': new Character('wood', 'Wood', '木', null, 1),
    '土': new Character('soil', 'Soil', '土', null, 1),
    '金': new Character('gold', 'Gold', '金', null, 1),
    '火': new Character('fire', 'Fire', '火', null, 1),
});

export function fromFullDictionary(characters) {
    const data = {};

    for (const character of characters) {
        data[character] = fullDictionary.getCharacter(character);
    }

    return new DictionaryData(data);
}

export const UserDictionaryContext = createContext();