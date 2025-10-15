import useImage from '../assets/useImage';

export class Item {
    constructor(itemType, itemCharacter) {
        this._itemType = itemType;
        this._itemCharacter = itemCharacter;
    }

    render() {
        return useImage(this._itemType);
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

    getLabel() {
        return Object.values(this._items).map(
            item => item._itemCharacter
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