import { motion } from 'framer-motion';
import { useState } from 'react';

interface EnvelopeProps {
    onOpen: () => void;
}

export const Envelope = ({ onOpen }: EnvelopeProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCardVisible, setIsCardVisible] = useState(false);

    const handleClick = () => {
        if (!isOpen) {
            setIsOpen(true);
            setTimeout(() => setIsCardVisible(true), 600); // Wait for flap animation
        } else if (isCardVisible) {
            onOpen(); // Trigger full reveal
        }
    };

    return (
        <div className="relative flex items-center justify-center pt-20" onClick={handleClick}>
            <motion.div
                className="cursor-pointer relative z-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Envelope Body */}
                <div className="relative w-72 h-48 bg-soft-red rounded-b-xl shadow-xl overflow-hidden flex items-end justify-center z-30">
                    {/* Bottom Fold */}
                    <div className="absolute inset-0 bg-red-400 opacity-20 pointer-events-none"
                        style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}></div>
                </div>

                {/* Flap */}
                <motion.div
                    className="absolute top-0 left-0 w-72 h-36 bg-red-500 rounded-t-xl origin-top z-30"
                    initial={{ rotateX: 0 }}
                    animate={{ rotateX: isOpen ? 180 : 0, zIndex: isOpen ? 10 : 40 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    style={{ clipPath: 'polygon(0 0, 50% 50%, 100% 0)' }} // Triangle-ish
                >
                    {/* Heart Seal */}
                    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl opacity-90 drop-shadow-md">
                        ❤️
                    </div>
                </motion.div>

                {/* Inner Card Preview */}
                <motion.div
                    className="absolute left-4 bottom-0 w-64 h-40 bg-paper-white rounded-lg shadow-inner flex flex-col items-center justify-start pt-4 z-20 pointer-events-none"
                    initial={{ y: 0 }}
                    animate={{ y: isOpen ? -100 : 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <div className="text-sm text-gray-400 font-gaegu">A Message for you...</div>
                    {isCardVisible && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-2 text-xs text-soft-red font-bold animate-pulse"
                        >
                            (Tap again!)
                        </motion.div>
                    )}
                </motion.div>

                {/* Envelope Back */}
                <div className="absolute insert-0 top-0 left-0 w-72 h-48 bg-red-600 rounded-xl z-0"></div>
            </motion.div>

            {!isOpen && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute -bottom-12 font-gaegu text-xl text-soft-red/80"
                >
                    Tap to open 💌
                </motion.p>
            )}
        </div>
    );
};
