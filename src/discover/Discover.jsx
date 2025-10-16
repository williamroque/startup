import React, { useRef, useState, useEffect, createContext, useContext, useImperativeHandle } from 'react';
import { useWindowSize } from 'react-use';

import Atrament from 'atrament';
import KanjiCanvas from '../kanjicanvas/kanji-canvas';

import './Discover.css';

import Dictionary from '../dictionary/Dictionary';
import { fullDictionary } from '../data/dictionaryData';

const CanvasContext = createContext(null);

function PredictiveCanvas({ handlePrediction }) {
    const canvasRef = useRef(null);
    const { canvasRef: forwardedRef } = useContext(CanvasContext);
    const [ strokes, setStrokes ] = useState([]);

    useImperativeHandle(forwardedRef, () => ({
        clearCanvas() {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            setStrokes([]);
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

            atrament.recordStrokes = true;

            atrament.mode = 'draw';
            atrament.color = '#212121';
            atrament.weight = 5;

            KanjiCanvas.init('discover-canvas');

            function handleStrokeRecorded({ stroke }) {
                setStrokes(prevStrokes => [
                    ...prevStrokes,
                    stroke.segments.map(segment => [segment.point.x, segment.point.y])
                ]);
            }

            atrament.addEventListener('strokerecorded', handleStrokeRecorded);

            return () => {
                atrament.removeEventListener('strokerecorded', handleStrokeRecorded);
            };
        }
    }, [windowWidth, windowHeight]);

    useEffect(() => {
        if (strokes.length > 0) {
            handlePrediction(
                KanjiCanvas.recognizePattern(strokes).split(' ')[0]
            );
        }
    }, [strokes, handlePrediction]);

    return (
        <canvas
            ref={canvasRef}
            className="frame"
            id="discover-canvas"
        />
    );
}

function InsertButton({ prediction }) {
    return (
        <button className={prediction ? 'discover-button' : 'discover-button disabled'}>
            Insert <span className="discover-button-span">{prediction}</span>
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

function ControlBox({ prediction }) {
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
            <InsertButton prediction={prediction} />
            <InsertPedestals pedestalValues={pedestalValues} />
        </div>
    );
}

function DiscoverSection() {
    const canvasRef = useRef(null);
    const [ prediction, setPrediction ] = useState(null);

    function clearCanvas() {
        if (canvasRef.current) {
            canvasRef.current.clearCanvas();
        }

        setPrediction(null);
    }

    function handlePrediction(prediction) {
        setPrediction(prediction);
    }
    
    const contextValue = { canvasRef, clearCanvas }

    return (
        <section>
            <CanvasContext.Provider value={contextValue}>
                <div className="discover-canvas-container">
                    <PredictiveCanvas handlePrediction={handlePrediction} />
                    <div className="texture-overlay"></div>
                </div>
                <ControlBox
                    prediction={prediction}
                    ref={canvasRef}
                />
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
