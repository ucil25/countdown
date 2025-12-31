import React, { useState, useEffect } from 'https://esm.sh/react@18.2.0';
import ReactDOM from 'https://esm.sh/react-dom@18.2.0/client';
import { motion, AnimatePresence } from 'https://esm.sh/framer-motion@10.16.4';
import confetti from 'https://esm.sh/canvas-confetti@1.6.0';

// Initial Target Date: Jan 1, 2026 00:00:00
const TARGET_DATE = new Date('2026-01-01T00:00:00').getTime();

const NumberBlock = ({ value, label }) => {
    return React.createElement(
        'div',
        { className: 'flex flex-col items-center mx-2 sm:mx-4' },
        React.createElement(
            'div',
            { className: 'relative h-20 sm:h-32 w-16 sm:w-24 flex items-center justify-center overflow-hidden' },
            React.createElement(
                AnimatePresence,
                { mode: 'popLayout' },
                React.createElement(
                    motion.span,
                    {
                        key: value,
                        initial: { y: 20, opacity: 0, filter: 'blur(10px)' },
                        animate: { y: 0, opacity: 1, filter: 'blur(0px)' },
                        exit: { y: -20, opacity: 0, filter: 'blur(10px)' },
                        transition: { type: 'spring', stiffness: 300, damping: 30 },
                        className: 'absolute text-5xl sm:text-8xl font-thin tracking-tighter text-white tabular-nums'
                    },
                    value.toString().padStart(2, '0')
                )
            )
        ),
        React.createElement(
            'span',
            { className: 'text-xs sm:text-sm uppercase tracking-[0.2em] text-white/40 mt-2' },
            label
        )
    );
};

const Countdown = ({ onComplete }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            // Debug: If using fixed time for testing, uncomment line below
            // const now = new Date('2025-12-31T23:59:55').getTime(); // Test close to midnight

            const distance = TARGET_DATE - now;

            if (distance <= 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                onComplete();
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [onComplete]);

    return React.createElement(
        motion.div,
        {
            initial: { scale: 0.9, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 1.5, opacity: 0, filter: 'blur(20px)' },
            className: 'glass-panel p-8 sm:p-12 rounded-3xl flex flex-wrap justify-center items-center z-10'
        },
        React.createElement(NumberBlock, { value: timeLeft.days, label: 'Days' }),
        React.createElement('div', { className: 'text-4xl sm:text-6xl text-white/20 font-thin -mt-8 mx-1' }, ':'),
        React.createElement(NumberBlock, { value: timeLeft.hours, label: 'Hours' }),
        React.createElement('div', { className: 'text-4xl sm:text-6xl text-white/20 font-thin -mt-8 mx-1' }, ':'),
        React.createElement(NumberBlock, { value: timeLeft.minutes, label: 'Minutes' }),
        React.createElement('div', { className: 'text-4xl sm:text-6xl text-white/20 font-thin -mt-8 mx-1' }, ':'),
        React.createElement(NumberBlock, { value: timeLeft.seconds, label: 'Seconds' })
    );
};

const Celebration = () => {
    useEffect(() => {
        const duration = 15 * 1000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ffffff', '#ffd700', '#c0c0c0', '#4f46e5']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ffffff', '#ffd700', '#c0c0c0', '#7c3aed']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        })();
    }, []);

    return React.createElement(
        motion.div,
        {
            initial: { scale: 0.5, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            transition: { type: 'spring', duration: 1.5, bounce: 0.5 },
            className: 'flex flex-col items-center justify-center z-20 text-center'
        },
        React.createElement(
            'h1',
            { className: 'text-8xl sm:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-100 text-glow-gold tracking-tighter' },
            '2026'
        ),
        React.createElement(
            'p',
            { className: 'text-xl sm:text-2xl text-white/60 mt-4 font-light tracking-[0.5em] uppercase' },
            'Happy New Year'
        )
    );
};

const App = () => {
    const [isNewYear, setIsNewYear] = useState(false);

    return React.createElement(
        'div',
        { className: 'min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-black' },
        // Mesh Gradient Background
        React.createElement('div', { className: 'mesh-gradient animate-pulse-slow' }),

        // Main Content
        React.createElement(
            AnimatePresence,
            { mode: 'wait' },
            !isNewYear
                ? React.createElement(Countdown, { key: 'countdown', onComplete: () => setIsNewYear(true) })
                : React.createElement(Celebration, { key: 'celebration' })
        ),

        // Footer/Copyright
        React.createElement(
            'div',
            { className: 'absolute bottom-8 text-white/20 text-xs tracking-widest uppercase' },
            'Designed for 2026'
        )
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
