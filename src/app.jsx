import React from 'react';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';

import Login from './login/Login';
import Gallery from './gallery/Gallery';

import './app.css';

export default function App() {
    return (
        <BrowserRouter>
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

            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/gallery" element={<Gallery />} />
            </Routes>

            <footer>
                William Roque | <a href="https://github.com/williamroque/startup/">GitHub</a>
            </footer>
        </BrowserRouter>
    );
};
