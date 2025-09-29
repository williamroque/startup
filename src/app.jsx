import React from 'react';
import { BrowserRouter, NavLink, Router, Routes } from 'react-router-dom';

import './app.css';

export default function App() {
    return (
        <BrowserRouter>
            <header>
                <nav>
                    <a href="gallery.html">
                        <img src="./assets/icons/gallery.svg"></img>
                        <span>Gallery</span>
                    </a>
                    <a href="studio.html">
                        <img src="./assets/icons/studio.svg" />
                        <span>Studio</span>
                    </a>
                    <a href="discover.html">
                        <span>化</span>
                        <span>Discover</span>
                    </a>
                    <a href="visit.html">
                        <img src="./assets/icons/visit.svg" />
                        <span>Visit</span>
                    </a>
                </nav>
            </header>
            <footer>
                William Roque | <a href="https://github.com/williamroque/startup/">GitHub</a>
            </footer>
        </BrowserRouter>
    );
};
