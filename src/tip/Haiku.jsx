import React, { useEffect, useState, useContext } from 'react';
import { UserDictionaryContext } from '../data/dictionaryData';

import './Haiku.css';

const haikuHints = [
    {
        'char': '川',
        'components': ['石', '水'],
        'haiku': 'Stone parts for the stream\nWater carves a winding path\nRiver finds its way'
    },
    {
        'char': '滝',
        'components': ['水', '水'],
        'haiku': 'Falls of water roar\nStreams combine in one descent\nMist ascends the cliff'
    },
    {
        'char': '橋',
        'components': ['木', '水'],
        'haiku': 'Wood meets moving streams\nPlanks reach out across the flow\nFootsteps cross with trust'
    },
    {
        'char': '生',
        'components': ['水', '土'],
        'haiku': 'Water feeds the earth\nHidden seeds begin to wake\nLife breaks into form'
    },
    {
        'char': '人',
        'components': ['生', '生'],
        'haiku': 'Two lives intertwine\nShared breath makes a budding soul\nOne stands in the light'
    },
    {
        'char': '家',
        'components': ['人', '木'],
        'haiku': 'One finds shelter here\nWooden beams embrace the wind\nHome grows warm within'
    },
    {
        'char': '寺',
        'components': ['家', '木'],
        'haiku': 'Home becomes sacred\nTimber lifts toward still air\nSilence fills the hall'
    },
    {
        'char': '城',
        'components': ['家', '金'],
        'haiku': 'Golden walls ascend\nHome is crowned with gleaming strength\nFortress holds the land'
    },
    {
        'char': '車',
        'components': ['火', '金'],
        'haiku': 'Fire tempers the steel\nMetal wakes with turning force\nWheels begin their run'
    },
    {
        'char': '草',
        'components': ['土', '木'],
        'haiku': 'Earth lifts slender stems\nWood remembers how to grow\nGrass sways in the breeze'
    },
    {
        'char': '花',
        'components': ['草', '金'],
        'haiku': 'Grass unveils its gold\nPetals open with soft light\nBlossoms greet the day'
    },
    {
        'char': '空',
        'components': ['火', '水'],
        'haiku': 'Fire meets drifting rain\nClouds awaken colored winds\nSky unfolds its breath'
    },
    {
        'char': '鳥',
        'components': ['空', '生'],
        'haiku': 'Sky gives rise to life\nWings discover open paths\nSong lifts on the air'
    },
    {
        'char': '竜',
        'components': ['鳥', '火'],
        'haiku': 'Wings ignite with flame\nMyth awakens heated breath\nDragon stirs again'
    },
    {
        'char': '田',
        'components': ['土', '人'],
        'haiku': 'Earth waits for the hand\nHuman steps prepare the field\nHarvest fills the sun'
    }
];

function Haiku() {
    const [hint, setHint] = useState(null);
    const { getDictionary } = useContext(UserDictionaryContext);

    useEffect(() => {
        getDictionary().then(userDictionary => {
            const possibleHints = haikuHints.filter(hint => {
                return !userDictionary.getCharacter(hint.char) && hint.components.every(component => {
                    return userDictionary.getCharacter(component);
                });
            });

            const choice = possibleHints[Math.floor(Math.random() * possibleHints.length)];

            setHint([choice.char, choice.haiku]);
        });
    }, []);

    return hint && (
        <div className="haiku-hint">
            <div className="haiku-hint-text">
                {hint[1] + '\n\n―But how to create me?'}
            </div>
            <div className="haiku-hint-character">
                {hint[0]}
            </div>
        </div>
    );
}

export default Haiku;