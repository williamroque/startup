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

    getSizeFactor() {
        return this._sizeFactor;
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
        this._characters[character.getCharacter()] = characterObject;
    }

    getCharacter(character) {
        return this._characters[character] || null;
    }

    getCharacters() {
        return Object.values(this._characters);
    }
}

export const fullDictionary = new DictionaryData({
    '石': new Character('stone', 'Stone', '石', null, 1),
    '水': new Character('water', 'Water', '水', null, 1),
    '川': new Character('river', 'River', '川', ['石', '水'], 1),
    '滝': new Character('waterfall', 'Waterfall', '滝', ['水', '水'], 1),
    '木': new Character('wood', 'Wood', '木', null, 1),
    '橋': new Character('bridge', 'Bridge', '橋', ['木', '水'], 1),
    '土': new Character('soil', 'Soil', '土', null, 1),
    '生': new Character('life', 'Life', '生', ['水', '土'], 1),
    '人': new Character('person', 'Person', '人', ['生', '生'], 1),
    '家': new Character('house', 'House', '家', ['人', '木'], 1),
    '寺': new Character('temple', 'Buddhist Temple', '寺', ['家', '木'], 1),
    '金': new Character('gold', 'Gold', '金', null, 1),
    '城': new Character('castle', 'Castle', '城', ['家', '金'], 1),
    '火': new Character('fire', 'Fire', '火', null, 1),
    '車': new Character('car', 'Car', '車', ['火', '金'], 1),
    '草': new Character('grass', 'Grass', '草', ['土', '木'], 1),
    '花': new Character('flower', 'Flower', '花', ['草', '金'], 1),
    '空': new Character('sky', 'Sky', '空', ['火', '水'], 1),
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