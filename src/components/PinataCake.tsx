import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface PinataCakeProps {
    onComplete: () => void;
}

const MAX_HEALTH = 100;
const DAMAGE_PER_HIT = 20; // 5 hits to break

export const PinataCake = ({ onComplete }: PinataCakeProps) => {
    const [health, setHealth] = useState(MAX_HEALTH);
    const [isHit, setIsHit] = useState(false);

    // Determine cake stage based on health
    const getStage = () => {
        if (health > 80) return 'clean';
        if (health > 60) return 'crack-1';
        if (health > 40) return 'crack-2';
        if (health > 20) return 'crack-3';
        return 'broken';
    };

    const handleHit = () => {
        if (health <= 0) return;

        // Sound effect trigger here (optional)

        // Confetti burst on hit (Food/Red themed)
        confetti({
            particleCount: 15,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#B91010', '#FCAE1E', '#FFFFFF'], // Red, Gold, White
            shapes: ['circle', 'square'], // can use 'star' too
        });

        const newHealth = Math.max(0, health - DAMAGE_PER_HIT);
        setHealth(newHealth);
        setIsHit(true);

        setTimeout(() => setIsHit(false), 200);

        if (newHealth === 0) {
            setTimeout(onComplete, 1000); // Wait for break anim
            // Big explosion
            confetti({
                particleCount: 100,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#B91010', '#FCAE1E', '#78F0F6'],
            });
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center">
            {/* Strength Meter / Health Bar */}
            <div className="w-48 h-4 bg-gray-200 rounded-full mb-8 border-2 border-iron-gold overflow-hidden relative">
                <motion.div
                    className="h-full bg-iron-red"
                    initial={{ width: '100%' }}
                    animate={{ width: `${(health / MAX_HEALTH) * 100}%` }}
                    transition={{ type: 'spring' }}
                />
                {/* Iron Man HUD Grid overlay */}
                <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzhhZWGMYAEYB8RmROaABADeOQ8CXl/xfgAAAABJRU5ErkJggg==')] opacity-20 pointer-events-none"></div>
            </div>

            {/* Cake Container */}
            <motion.div
                className="relative cursor-pointer"
                animate={isHit ? { x: [-10, 10, -10, 10, 0], scale: 0.95 } : { y: [0, -15, 0] }}
                transition={isHit ? { duration: 0.2 } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
                onClick={handleHit} // Fallback click
                id="cake-target"
            >
                {/* Placeholder Cake Graphics */}
                <div className={`w-64 h-64 bg-pink-300 rounded-xl relative shadow-2xl flex items-center justify-center border-b-8 border-pink-400 ${health <= 0 ? 'opacity-0 scale-150 rotate-12 transition-all duration-700' : ''}`}>
                    {/* Arc Reactor Glow Background */}
                    <div className="absolute inset-0 bg-arc-cyan blur-2xl opacity-20 hover:opacity-40 transition-opacity rounded-full z-0"></div>

                    <span className="text-6xl z-10">🎂</span>

                    {/* Cracks Overlay */}
                    {getStage() !== 'clean' && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="text-4xl font-bold opacity-60 text-iron-red rotate-45">
                                {getStage() === 'crack-1' && "/"}
                                {getStage() === 'crack-2' && "//"}
                                {getStage() === 'crack-3' && "///"}
                            </span>
                        </div>
                    )}
                </div>
            </motion.div>

            <p className="mt-4 text-iron-red font-gaegu text-2xl animate-pulse">
                {health > 0 ? "Drag the Hammer to Hit!" : "BROKEN!"}
            </p>
        </div>
    );
};
