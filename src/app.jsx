import React, { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';

import AuthState from './login/authState';

import { useDictionary, useLogin } from './api/apiHooks';

import Login from './login/Login';
import Gallery from './gallery/Gallery';
import Studio from './studio/Studio';
import Definition from './definition/Definition';
import Discover from './discover/Discover';
import Visit from './visit/Visit';
import VisitGallery from './visit/VisitGallery';

import { UserDictionaryContext } from './data/dictionaryData';

import { useWebSocket } from './api/webSocket';

import galleryIcon from './assets/icons/gallery.svg';
import studioIcon from './assets/icons/studio.svg';
import visitIcon from './assets/icons/visit.svg';
import logoutIcon from './assets/icons/logout.svg';

import './app.css';

export default function App() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const { username, authState, authError, logout, create, login } = useLogin();
    const { userDictionary, getDictionary, addDictionaryCharacter } = useDictionary(logout);

    const contextValue = { userDictionary, getDictionary, addDictionaryCharacter };
    const showHeader = (
        authState === AuthState.Authenticated
        && !pathname.startsWith('/definition')
        && !pathname.startsWith('/visit-gallery')
        && pathname !== '/visit-gallery'
    );

    const { announceVisit, addObserver } = useWebSocket();
    const [ userVisit, setUserVisit ] = useState(null);

    function onVisited(event, data) {
        if (event === 'visit') {
            const { user, otherUser } = data;

            if (otherUser === username) {
                setUserVisit(user);
            }
        }
    }

    useEffect(() => {
        addObserver(onVisited);
    }, []);

    function onVisitOther(otherUser) {
        announceVisit(username, otherUser);
    }

    return (
        <UserDictionaryContext.Provider value={contextValue}>
            <div id="app">
                {showHeader ? (
                    <header>
                        <nav>
                            <NavLink to="gallery" className="nav-link">
                                <img src={galleryIcon}></img>
                                <span>Gallery</span>
                            </NavLink>
                            <NavLink to="studio" className="nav-link">
                                <img src={studioIcon} />
                                <span>Studio</span>
                            </NavLink>
                            <NavLink to="discover" className="nav-link">
                                <span>化</span>
                                <span>Discover</span>
                            </NavLink>
                            <NavLink to="visit" className="nav-link">
                                <img src={visitIcon} />
                                <span>Visit</span>
                            </NavLink>
                            <a
                                className="nav-link"
                                onClick={logout}
                            >
                                <img src={logoutIcon}></img>
                                <span>Log out</span>
                            </a>
                        </nav>
                    </header>
                ) : ''}

                <Routes>
                    {authState === AuthState.Authenticated ? (
                        <>
                            <Route path="/gallery" element={<Gallery username={username} userVisit={userVisit} logout={logout} />} />
                            <Route path="/studio" element={<Studio logout={logout} />} />
                            <Route path="/definition/:character" element={<Definition logout={logout} />} />
                            <Route path="/discover" element={<Discover />} />
                            <Route path="/visit" element={<Visit username={username} logout={logout} />} />
                            <Route path="/visit-gallery/:user" element={<VisitGallery onVisitOther={onVisitOther} logout={logout} />} />
                        </>
                    ) : ''}
                    <Route path="/login" element={
                        <Login
                            onCreate={async (username, password) => {
                                const status = await create(username, password);

                                if (status === 200) {
                                    navigate('/gallery');
                                }
                            }}
                            onLogin={async (username, password) => {
                                const status = await login(username, password);

                                if (status === 200) {
                                    navigate('/gallery');
                                }
                            }}
                            authError={authError}
                        />
                    } />
                    <Route
                        path="*"
                        element={
                            authState === AuthState.Authenticated ? (
                                <Navigate to="/gallery" replace />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />
                </Routes>

                <footer>
                    William Roque | <a href="https://github.com/williamroque/startup/">GitHub</a>
                </footer>
            </div>
        </UserDictionaryContext.Provider>
    );
};
