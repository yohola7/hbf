import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMidnight } from "./hooks/useMidnight";
import { CountdownTimer } from "./components/CountdownTimer";
import RandomStickers from "./components/RandomStickers";
import { Envelope } from "./components/Envelope";
import { BirthdayRevealCard } from "./components/BirthdayRevealCard";
import confetti from "canvas-confetti";


const TapeSticker = ({ text, className, rotate }: { text: string; className?: string; rotate: number }) => (
    <motion.div
        initial={{ scale: 0, opacity: 0, x: -20 }}
        animate={{ scale: 1, opacity: 1, x: 0 }}
        transition={{ delay: 0.7, type: "spring" }}
        className={`relative inline-block bg-pink-500 text-white px-4 py-2 font-black tracking-widest text-xl transform shadow-md z-40 max-w-[90vw] text-center leading-snug ${className}`}
        style={{ rotate: `${rotate}deg` }}
    >
        {text}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/20 border-r border-dashed border-white/40"></div>
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/20 border-l border-dashed border-white/40"></div>
    </motion.div>
);

function App() {
    const { isMidnight, timeLeft } = useMidnight();
    const [phase, setPhase] = useState<'countdown' | 'envelope' | 'card'>('countdown');

    // Watch for midnight transition
    useEffect(() => {
        if (isMidnight && phase === 'countdown') {
            // Transition to envelope
            setPhase('envelope');

            // Slower, warmer confetti for the "Midnight Moment"
            const duration = 3 * 1000;
            const end = Date.now() + duration;

            (function frame() {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#FF6B6B', '#F4D35E', '#FFF0F0']
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#FF6B6B', '#F4D35E', '#FFF0F0']
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }
    }, [isMidnight, phase]);

    const handleOpenEnvelope = () => {
        setPhase('card');
        // Big celebration burst
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FF6B6B', '#F4D35E', '#FFF']
        });
    };

    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll effect when card appears
    useEffect(() => {
        if (phase === 'card') {
            // Slight delay to allow animation to complete and layout to stabilize
            const timer = setTimeout(() => {
                if (scrollRef.current) {
                    // Check if scroll is actually needed
                    if (scrollRef.current.scrollHeight > scrollRef.current.clientHeight) {
                        scrollRef.current.scrollTo({
                            top: 150, // Fixed pixel amount to ensure movement
                            behavior: 'smooth'
                        });
                    }
                }
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [phase]);

    return (
        <div className="w-full h-screen relative overflow-hidden bg-blush-pink text-gray-800 font-gaegu selection:bg-soft-red selection:text-white transition-colors duration-1000 ease-in-out">

            {/* Background (Gradient wash) */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${phase !== 'countdown' ? 'opacity-50 bg-gradient-to-b from-yellow-50 to-pink-50' : 'opacity-0'}`}></div>

            <RandomStickers isDraggable={phase !== 'card'} />

            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4 pointer-events-none">

                <AnimatePresence mode="wait">
                    {phase === 'countdown' && (
                        <motion.div
                            key="countdown"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                            transition={{ duration: 1 }}
                            className="text-center flex flex-col items-center pointer-events-auto"
                        >

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-xl md:text-2xl text-soft-red font-bold mb-4 block bg-white px-1 inline-block transform -rotate-3 mb-1 shadow-sm"
                            >
                                What will be coming ? 🤔
                            </motion.div>

                            <CountdownTimer timeLeft={timeLeft} />
                        </motion.div>
                    )}

                    {phase === 'envelope' && (

                        <motion.div
                            key="envelope"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 1, type: "spring" }}
                            className="pointer-events-auto"
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                className="absolute w-screen h-screen inset-0 backdrop-blur-[2px] bg-white/10 z-0"
                            ></motion.div>

                            <div className="text-center mb-10">
                                <TapeSticker text="Happy Birthday! Titas <3" className="text-4xl md:text-6xl font-bold text-soft-red mb-4" rotate={0} />
                            </div>
                            <Envelope onOpen={handleOpenEnvelope} />
                        </motion.div>
                    )}

                    {phase === 'card' && (
                        <motion.div
                            key="card"
                            ref={scrollRef}
                            className="w-full h-full relative overflow-y-auto overflow-x-hidden pointer-events-auto"
                        >
                            {/* Blur Overlay - Fixed position so it stays while scrolling */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                className="fixed inset-0 w-full h-full backdrop-blur-[2px] bg-white/10 z-0 pointer-events-none"
                            ></motion.div>

                            <div className="relative z-10 min-h-full flex items-center justify-center py-10">
                                <BirthdayRevealCard
                                    message="Wish you a very very very Happy Birthday Cutieeee. I wish you a new chapter filled with lots of love and laughter. Keep smiling and being yourself. ENJOYYYYYYYY!!!"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}

export default App;
