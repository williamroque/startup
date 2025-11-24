import React, { useEffect, useState } from 'react';

import './Tip.css';

const tips = {
    'go-studio': 'Go to the Studio tab to create new frames.',
    'explain-studio': 'Each input square below corresponds to a space on the frame (top left, top middle, etc.). Select characters to draw their representations.',
    'explain-dictionary': 'This is a list of all the characters you have discovered so far. Click on an entry to learn how to write the character and see its picture representation.',
    'go-discover': 'Go to the Discover tab in order to find new characters to use in your paintings.',
    'explain-discover': 'Write one of the characters in your dictionary by hand in the canvas below. Then, click the Insert button to save the detected character to one of the white spaces. If the two characters you insert form a valid combo, you will unlock a new character!',
    'explain-discover-buttons': 'Click Clear Canvas to erase canvas contents. Click Clear All to erase the canvas and the white spaces.',
    'explain-visit': 'Click on a person\'s username to visit their gallery!'
};

export default function Tip({ tipID }) {
    const [ isHidden, setIsHidden ] = useState(true);

    useEffect(() => {
        const storedList = JSON.parse(localStorage.getItem('hidden-tips'));

        if (!storedList || storedList.indexOf(tipID) === -1) {
            setIsHidden(false);
        }
    }, []);

    function onClick() {
        setIsHidden(true);
        
        const storedList = JSON.parse(localStorage.getItem('hidden-tips')) || [];
        localStorage.setItem(
            'hidden-tips',
            JSON.stringify([...storedList, tipID])
        );
    }

    return isHidden ? '' : (
        <div className="tip-container">
            <div className="tip-text">
                <b>Tip:</b> {tips[tipID]}
            </div>
            <div className="tip-close" onClick={onClick}>
                ✕
            </div>
        </div>
    );
}