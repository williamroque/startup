import { useEffect, useRef } from 'react';

const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
const socketURL = `${protocol}://${window.location.host}/ws`;

function useWebSocket() {
    const queueRef = useRef([]);
    const observersRef = useRef([]);
    const socketRef = useRef(null);

    const announceVisit = (user, otherUser) => {
        const s = socketRef.current;
        const message = JSON.stringify({ user, otherUser });

        if (s && s.readyState === WebSocket.OPEN) {
            s.send(message);
            return true;
        }

        queueRef.current.push(message);
        return false;
    };

    const addObserver = observer => {
        observersRef.current.push(observer);
    };

    const notifyObservers = (event, data) => {
        observersRef.current.forEach(observer => observer(event, data));
    };
    
    useEffect(() => {
        const webSocket = new WebSocket(socketURL);
        socketRef.current = webSocket;

        webSocket.onopen = () => {
            const queue = queueRef.current;

            for (const message of queue) {
                if (webSocket.readyState === webSocket.OPEN) {
                    webSocket.send(message);
                }
            }

            queueRef.current = [];
        };

        webSocket.onmessage = async event => {
            const text = await event.data.text();
            notifyObservers('visit', JSON.parse(text));
        };

        webSocket.onclose = () => {
            socketRef.current = null;
        };

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
                socketRef.current = null;
            }
        };
    }, []);

    return { announceVisit, addObserver };
}

export { useWebSocket };