import React from 'react';

import './Tip.css';

const tips = {
    'go-studio': 'Go to the Studio tab to create new frames.',
    'explain-studio': 'Each input square below corresponds to a space on the frame. Select characters to draw their representations.',
    'explain-dictionary': '',
    'go-discovery': '',
    'explain-discovery': ''
};

export default function Tip({ tipID }) {
    return (
        <div className="tip-container">
            <div className="tip-text">
                <b>Tip:</b> {tips[tipID]}
            </div>
            <div className="tip-close">
                ✕
            </div>
        </div>
    );
}