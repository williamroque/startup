import useImage from '../assets/useImage';

export class Item {
    constructor(character) {
        this._character = character;
    }

    getLabel() {
        return this._character.getCharacter();
    }

    getImage() {
        return useImage(this._character.getID());
    }
}

export class Frame {
    constructor(items) {
        this._items = items;

        if (!this._items) {
            this._items = {};
        }
    }

    addItem(item, position) {
        this._items[position] = item;
    }

    getItems() {
        return Object.entries(this._items);
    }

    getLabel() {
        return Object.values(this._items).map(
            item => item.getLabel()
        ).join('');
    }
}

export class GalleryData {
    constructor(frames) {
        this._frames = frames;

        if (!this._frames) {
            this._frames = [];
        }
    }

    addFrame(frame) {
        this._frames.push(frame);
    }
}