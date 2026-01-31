import { motion } from 'framer-motion';
import { useRef } from 'react';

interface HammerToolProps {
    onHit: () => void;
}

export const HammerTool = ({ onHit }: HammerToolProps) => {
    const constraintsRef = useRef(null);

    return (
        <>
            <div className="fixed inset-0 pointer-events-none" ref={constraintsRef} />

            <motion.div
                drag
                dragConstraints={constraintsRef}
                whileDrag={{ scale: 1.2, rotate: -45 }}
                dragSnapToOrigin={true}
                onDragEnd={(e, info) => {
                    // Simple collision detection logic
                    // In a real app, we'd check elementFromPoint or overlap
                    // Here, we'll check if drag ended near center (where cake usually is)
                    const element = document.elementFromPoint(info.point.x, info.point.y);
                    if (element?.closest('#cake-target')) {
                        onHit();
                    }
                }}
                className="fixed bottom-10 right-10 z-50 cursor-grab active:cursor-grabbing text-6xl"
                initial={{ rotate: 0 }}
            >
                🔨
                {/* Glow effect */}
                <div className="absolute inset-0 bg-iron-gold blur-lg opacity-30 rounded-full -z-10 animate-pulse"></div>
            </motion.div>
        </>
    );
};
