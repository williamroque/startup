import React from 'react';
import { useState } from 'react';
import { NavLink, Routes, Route, useLocation } from 'react-router-dom';

import AuthState from './login/authState';

import Login from './login/Login';
import Gallery from './gallery/Gallery';
import Studio from './studio/Studio';
import Definition from './definition/Definition';
import Discover from './discover/Discover';
import Visit from './visit/Visit';
import VisitGallery from './visit/VisitGallery';

import galleryIcon from './assets/icons/gallery.svg';
import studioIcon from './assets/icons/studio.svg';
import visitIcon from './assets/icons/visit.svg';

import './app.css';

export default function App() {
    const { pathname } = useLocation();
    const [ authState, setAuthState ] = useState(AuthState.Unauthenticated);
    const [ username, setUsername ] = useState('');

    return (
        <div id="app">
            { authState === AuthState.Authenticated && pathname !== '/definition' && pathname !== '/visit-gallery' ? (
                <header>
                    <nav>
                        <NavLink to="gallery" className="nav-link">
                            <img src={ galleryIcon }></img>
                            <span>Gallery</span>
                        </NavLink>
                        <NavLink to="studio" className="nav-link">
                            <img src={ studioIcon }/>
                            <span>Studio</span>
                        </NavLink>
                        <NavLink to="discover" className="nav-link">
                            <span>化</span>
                            <span>Discover</span>
                        </NavLink>
                        <NavLink to="visit" className="nav-link">
                            <img src={ visitIcon } />
                            <span>Visit</span>
                        </NavLink>
                    </nav>
                </header>
            ) : ''}

            <Routes>
                <Route
                    path="/"
                    element={
                        <Login
                            onAuthStateChange={(username, authState) => {
                                setUsername(username);
                                setAuthState(authState);
                            }}
                        />
                    }
                />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/studio" element={<Studio />} />
                <Route path="/definition" element={<Definition />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/visit" element={<Visit />} />
                <Route path="/visit-gallery" element={<VisitGallery />} />
            </Routes>

            <footer>
                William Roque | <a href="https://github.com/williamroque/startup/">GitHub</a>
            </footer>
        </div>
    );
};
