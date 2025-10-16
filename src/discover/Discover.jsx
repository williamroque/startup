import React, { useRef, useState, useEffect, createContext, useContext, useImperativeHandle } from 'react';
import { useWindowSize } from 'react-use';
import Atrament from 'atrament';

import './Discover.css';

import Dictionary from '../dictionary/Dictionary';
import { fullDictionary } from '../data/dictionaryData';

const CanvasContext = createContext(null);

function PredictiveCanvas() {
    const canvasRef = useRef(null);
    const { canvasRef: forwardedRef } = useContext(CanvasContext);

    useImperativeHandle(forwardedRef, () => ({
        clearCanvas() {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    }))

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

function ClearCanvasButton({ handleClearCanvas }) {
    return (
        <button className="discover-button" onClick={handleClearCanvas}>
            Clear Canvas
        </button>
    );
}

function ClearAllButton({ handleClearAll }) {
    return (
        <button className="discover-button" onClick={handleClearAll}>
            Clear All
        </button>
    );
}

function InsertPedestals({ pedestalValues }) {
    return (
        <div className="discover-pedestals">
            <div className="discover-pedestal">{pedestalValues[0] || ''}</div>
            <div className="discover-pedestal">{pedestalValues[1] || ''}</div>
        </div>
    );
}

function ControlBox() {
    const [ pedestalValues, setPedestalValues ] = useState([]);

    const { clearCanvas } = useContext(CanvasContext);

    function handleClearCanvas() {
        clearCanvas();
    }

    function handleClearAll() {
        clearCanvas();
        setPedestalValues([]);
    }

    return (
        <div className="discover-box">
            <div className="discover-clear-buttons">
                <ClearCanvasButton handleClearCanvas={handleClearCanvas} />
                <ClearAllButton handleClearAll={handleClearAll} />
            </div>
            <InsertButton />
            <InsertPedestals pedestalValues={pedestalValues} />
        </div>
    );
}

function DiscoverSection() {
    const canvasRef = useRef(null);

    function clearCanvas() {
        if (canvasRef.current) {
            canvasRef.current.clearCanvas();
        }
    }
    
    const contextValue = { canvasRef, clearCanvas }

    return (
        <section>
            <CanvasContext.Provider value={contextValue}>
                <div className="discover-canvas-container">
                    <PredictiveCanvas />
                    <div className="texture-overlay"></div>
                </div>
                <ControlBox clearCanvas={clearCanvas} ref={canvasRef} />
            </CanvasContext.Provider>
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
