import React from 'react';
import { NavLink, Routes, Route, useLocation } from 'react-router-dom';

import Login from './login/Login';
import Gallery from './gallery/Gallery';
import Studio from './studio/Studio';
import Definition from './definition/Definition';

import './app.css';

export default function App() {
    const { pathname } = useLocation();

    return (
        <div id="app">
            { pathname !== '/definition' ? (
                <header>
                    <nav>
                        <NavLink to="gallery" className="nav-link">
                            <img src="./assets/icons/gallery.svg"></img>
                            <span>Gallery</span>
                        </NavLink>
                        <NavLink to="studio" className="nav-link">
                            <img src="./assets/icons/studio.svg" />
                            <span>Studio</span>
                        </NavLink>
                        <NavLink to="discover" className="nav-link">
                            <span>化</span>
                            <span>Discover</span>
                        </NavLink>
                        <NavLink to="visit" className="nav-link">
                            <img src="./assets/icons/visit.svg" />
                            <span>Visit</span>
                        </NavLink>
                    </nav>
                </header>
            ) : ''}

            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/studio" element={<Studio />} />
                <Route path="/definition" element={<Definition />} />
            </Routes>

            <footer>
                William Roque | <a href="https://github.com/williamroque/startup/">GitHub</a>
            </footer>
        </div>
    );
};
