import useImage from '../assets/useImage';

export class Item {
    constructor(character) {
        this._character = character;
    }

    isEmpty() {
        return !this._character;
    }

    getLabel() {
        if (this.isEmpty()) {
            return '';
        }
        return this._character.getCharacter();
    }

    getSizeFactor() {
        return this._character.getSizeFactor();
    }

    getImage() {
        return useImage(this._character.getID());
    }
}

export class Frame {
    constructor(items, id) {
        this._items = items;
        this._id = id;

        if (!this._items) {
            this._items = {};
        }

        if (!this._id) {
            this._id = Date.now();
        }
    }

    addItem(item, position) {
        this._items[position] = item;
    }

    swapCharacter(character, position) {
        let items = {...this._items};
        items[position] = new Item(character);

        return new Frame(items);
    }

    getItems() {
        return Object.entries(this._items).filter(([_, item]) => !item.isEmpty());
    }

    getLabel() {
        return Object.values(this._items).map(
            item => item.getLabel()
        ).join('');
    }
}