import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Helper to get random integer
const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const RandomStickers = ({ isDraggable = true }: { isDraggable?: boolean }) => {
    const [stickers, setStickers] = useState<string[]>([]);
    const [positions, setPositions] = useState<{ top: number; left: number; rotate: number; scale: number; delay: number }[]>([]);

    useEffect(() => {
        // Dynamically import all images from the stickers folder
        const modules = import.meta.glob('../assets/stickers/*.{png,jpg,jpeg,svg,gif}', { eager: true });

        // Extract the paths (processed by Vite)
        const loadedStickers = Object.values(modules).map((mod: any) => mod.default);
        setStickers(loadedStickers);

        // Mitchell's Best-Candidate Algorithm
        // "Random but evenly spread" - places items far from each other



        // Safe zones (percentages)
        const safeXMin = 5;
        const safeXMax = 95;
        const safeYMin = 5;
        const safeYMax = 95;

        const newPositions: { top: number; left: number; rotate: number; scale: number; delay: number }[] = [];
        const numCandidates = 20; // Higher = more even distribution

        loadedStickers.forEach(() => {
            let bestCandidate = { top: 0, left: 0 };
            let maxMinDist = -1;

            for (let i = 0; i < numCandidates; i++) {
                const cX = Math.random() * (safeXMax - safeXMin) + safeXMin;
                const cY = Math.random() * (safeYMax - safeYMin) + safeYMin;

                // Find distance to closest existing sticker
                let minDist = Number.MAX_VALUE;

                if (newPositions.length === 0) {
                    minDist = Number.MAX_VALUE; // First one can be anywhere
                } else {
                    for (const p of newPositions) {
                        // Calculate Euclidean distance between candidate and existing point
                        // We treat % as units. 
                        // Vertical distance weighted slightly if portrait to encourage spreading down
                        const dist = Math.sqrt((cX - p.left) ** 2 + (cY - p.top) ** 2);
                        if (dist < minDist) minDist = dist;
                    }
                }

                if (minDist > maxMinDist) {
                    maxMinDist = minDist;
                    bestCandidate = { top: cY, left: cX };
                }
            }

            newPositions.push({
                top: bestCandidate.top,
                left: bestCandidate.left,
                rotate: getRandomInt(-30, 30),
                scale: Math.random() * 0.4 + 0.9, // 0.9 to 1.3
                delay: Math.random() * 2,
            });
        });

        setPositions(newPositions);

    }, []);

    if (stickers.length === 0) return null;

    return (
        <div className="absolute inset-0 overflow-hidden z-0">
            {stickers.map((src, index) => (
                <motion.img
                    key={index}
                    src={src}
                    alt="sticker"
                    drag={isDraggable}
                    dragElastic={0.2}
                    whileHover={isDraggable ? { scale: 1.1, cursor: 'grab' } : undefined}
                    whileDrag={isDraggable ? { scale: 1.2, cursor: 'grabbing', zIndex: 100 } : undefined}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: positions[index]?.scale || 1.0 }}
                    transition={{
                        duration: 0.8,
                        delay: positions[index]?.delay || 0,
                        type: "spring"
                    }}
                    className={`absolute drop-shadow-md opacity-90 ${isDraggable ? 'touch-none' : ''}`}
                    style={{
                        top: `${positions[index]?.top}%`,
                        left: `${positions[index]?.left}%`,
                        transform: `translate(-50%, -50%) rotate(${positions[index]?.rotate}deg)`,
                        maxWidth: 'min(220px, 40vw)',
                        maxHeight: 'min(220px, 40vw)'
                    }}
                />
            ))}
        </div>
    );
};

export default RandomStickers;
