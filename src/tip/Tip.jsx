import React, { useEffect, useState } from 'react';

import './Tip.css';

const tips = {
    'go-studio': 'Go to the Studio tab to create new frames.',
    'explain-studio': 'Each input square below corresponds to a space on the frame. Select characters to draw their representations.',
    'explain-dictionary': '',
    'go-discovery': '',
    'explain-discovery': ''
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