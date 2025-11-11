import { useState, useEffect } from 'react';

import AuthState from '../login/authState';
import { Item, Frame } from '../data/galleryData';
import { fullDictionary, fromFullDictionary, defaultUserDictionary } from '../data/dictionaryData';

function useLogin() {
    const [ username, setUsername ] = useState(
        localStorage.getItem('username')
    );
    const [ authState, setAuthState ] = useState(
        username ? AuthState.Authenticated : AuthState.Unauthenticated
    );
    const [ authError, setAuthError ] = useState(null);

    const login = async (username, password) => {
        const response = await fetch('/api/auth/login', {
            method: 'post',
            body: JSON.stringify({ username: username, password: password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        if (response?.status === 200) {
            localStorage.setItem('username', username);
            setAuthError(null);
            setAuthState(AuthState.Authenticated);
            setUsername(username);
        } else {
            setAuthError(response?.status);
        }

        return response?.status;
    };

    const create = async (username, password) => {
        const response = await fetch('/api/auth/create', {
            method: 'post',
            body: JSON.stringify({ username: username, password: password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        if (response?.status === 200) {
            localStorage.setItem('username', username);
            setAuthError(null);
            setAuthState(AuthState.Authenticated);
            setUsername(username);
        } else {
            setAuthError(response?.status);
        }

        return response?.status;
    };

    const logout = async () => {
        const response = await fetch('/api/auth/logout', {
            method: 'delete',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        localStorage.removeItem('username');
        setAuthState(AuthState.Unauthenticated);
        setAuthError(null);
        setUsername(null);

        return response?.status;
    };

    return { username, authState, authError, login, create, logout };
}

function useGallery(logout) {
    const [ frames, setFrames ] = useState([]);

    const getFrames = async username => {
        const response = await fetch(`/api/gallery/${username}`, {
            method: 'get',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        if (response?.status === 401) {
            if (logout) logout();
            return null;
        }

        if (response?.status === 200) {
            let frameData = await response.json();

            frameData = frameData.map(frame => {
                let items = {};

                for (const position in frame) {
                    if (position !== 'id') {
                        const character = frame[position];
                        items[position] = new Item(fullDictionary.getCharacter(character));
                    }
                }

                return new Frame(items, frame.id);
            });

            setFrames(frameData);

            return frameData;
        }

        return null;
    };

    const addFrame = async frame => {
        let data = {};
        for (const position in frame._items) {
            const item = frame._items[position];

            if (!item.isEmpty()) {
                data[position] = item.getLabel();
            }
        }

        data['id'] = frame._id;

        const response = await fetch('/api/add-frame', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        if (response?.status === 401) {
            if (logout) logout();
            return null;
        }

        if (response?.status === 200) {
            setFrames([...frames, frame]);
            return await response.json();
        }

        return null;
    };

    const removeFrame = async frame => {
        const response = await fetch('/api/remove-frame', {
            method: 'post',
            body: JSON.stringify({ id: frame._id }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        if (response?.status === 401) {
            if (logout) logout();
            return null;
        }

        if (response?.status === 200) {
            setFrames(frames.filter(f => f._id !== frame._id));
            return await response.json();
        }

        return null;
    };

    return { getFrames, addFrame, removeFrame, frames };
}

function useDictionary(logout) {
    const [ userDictionary, setUserDictionary ] = useState(defaultUserDictionary);

    const getDictionary = async () => {
        const response = await fetch('/api/user-dictionary', {
            method: 'get',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        let storedDictionary = defaultUserDictionary;

        if (response?.status === 401) {
            if (logout) logout();
            return null;
        }

        if (response?.status === 200) {
            const data = await response.json();

            if (data?.length) {
                storedDictionary = fromFullDictionary(
                    data
                );
            }
        }

        setUserDictionary(storedDictionary);

        return storedDictionary;
    };

    const addDictionaryCharacter = async character => {
        const response = await fetch('/api/add-character', {
            method: 'post',
            body: JSON.stringify([character.getCharacter()]),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        if (response?.status === 401) {
            if (logout) logout();
            return null;
        }

        if (response?.status === 200) {
            setUserDictionary(
                userDictionary.learnCharacter(character)
            );
            return await response.json();
        }

        return null;
    };

    return { userDictionary, getDictionary, addDictionaryCharacter };
}

function useStrokeOrder(logout) {
    const [ videoURL, setVideoURL ] = useState(null);

    const getVideoURL = async character => {
        const response = await fetch(`/api/stroke-order-url/${character}`, {
            method: 'get',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'x-rapidapi-key': '3b6920303cmshefdcf776b96e2b5p13d261jsnbd43d6be6670',
                'x-rapidapi-host': 'kanjialive-api.p.rapidapi.com'
            }
        });

        if (response?.status === 401) {
            if (logout) logout();
            return null;
        }

        if (response?.status === 200) {
            const data = await response.json();
            const url = data.url;

            setVideoURL(url);

            return url;
        }

        setVideoURL(null);
        return null;
    };

    return { videoURL, getVideoURL };
}

async function getUserList(logout) {
    const response = await fetch('/api/user-list', {
        method: 'get',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });

    if (response?.status === 401) {
        if (logout) logout();
        return null;
    }

    if (response?.status === 200) {
        return await response.json();
    }

    return null;
}

export { useLogin, useGallery, useDictionary, useStrokeOrder, getUserList };