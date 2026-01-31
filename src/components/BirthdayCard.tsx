import { motion } from 'framer-motion';

interface BirthdayCardProps {
    message: string;
}

export const BirthdayCard = ({ message }: BirthdayCardProps) => {
    return (
        <motion.div
            layoutId="card-expand"
            initial={{ scale: 0.8, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="bg-paper-white relative w-full max-w-lg p-8 md:p-12 rounded-lg shadow-2xl mx-4 my-8 text-center border-2 border-dashed border-soft-red/30"
        >
            {/* Tape Effect */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-yellow-100/50 backdrop-blur-sm rotate-1 shadow-sm"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <h1 className="text-5xl md:text-6xl text-soft-red font-bold mb-6 font-gaegu">Happy Birthday! 🎉</h1>

                <div className="text-xl md:text-2xl text-gray-600 leading-relaxed font-gaegu whitespace-pre-wrap">
                    {message}
                </div>

                <div className="mt-8 flex justify-center gap-4 text-3xl opacity-80">
                    <motion.span animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>🍰</motion.span>
                    <motion.span animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2.2 }}>✨</motion.span>
                    <motion.span animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>🎈</motion.span>
                </div>
            </motion.div>
        </motion.div>
    );
};
