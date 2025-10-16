import React, { useRef, useEffect } from 'react';
import { useWindowSize } from 'react-use';
import Atrament from 'atrament';

import './Discover.css';

import Dictionary from '../dictionary/Dictionary';
import { fullDictionary } from '../data/dictionaryData';

function PredictiveCanvas() {
    const canvasRef = useRef(null);
    const { width: windowWidth, height: windowHeight } = useWindowSize();

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            const dpr = window.devicePixelRatio || 1;

            const parent = canvas.parentElement;
            const canvasWidth = parent.clientWidth;
            const canvasHeight = 4/5 * canvasWidth;

            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            ctx.scale(dpr, dpr);

            const atrament = new Atrament(canvas);

            atrament.mode = 'draw';
            atrament.color = '#212121';
            atrament.weight = 5;
        }
    }, [windowWidth, windowHeight]);

    return (
        <canvas
            ref={canvasRef}
            className="frame"
        />
    );
}

function InsertButton() {
    return (
        <button className="discover-button">
            Insert <span className="discover-button-span">水</span>
        </button>
    );
}

function ClearCanvasButton() {
    return (
        <button className="discover-button">
            Clear Canvas
        </button>
    );
}

function ClearAllButton() {
    return (
        <button className="discover-button">
            Clear All
        </button>
    );
}

function InsertPedestals() {
    return (
        <div className="discover-pedestals">
            <div className="discover-pedestal">水</div>
            <div className="discover-pedestal"></div>
        </div>
    );
}

function ControlBox() {
    return (
        <div className="discover-box">
            <div className="discover-clear-buttons">
                <ClearCanvasButton />
                <ClearAllButton />
            </div>
            <InsertButton />
            <InsertPedestals />
        </div>
    );
}

function DiscoverSection() {
    return (
        <section>
            <div className="discover-canvas-container">
                <PredictiveCanvas />
                <div className="texture-overlay"></div>
            </div>
            <ControlBox />
        </section>
    );
}

export default function Discover() {
    return (
        <main>
            <h1>Discover</h1>
            <DiscoverSection />
            <Dictionary dictionary={fullDictionary} />
        </main>
    );
}
