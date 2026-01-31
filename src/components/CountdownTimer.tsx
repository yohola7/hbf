
import { motion } from 'framer-motion';

interface CountdownTimerProps {
    timeLeft: {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    };
}

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-1 md:mx-4 scale-90 md:scale-100 ">
        <div className="glass-panel rounded-2xl p-2 md:p-4 w-16 h-20 md:w-24 md:h-32 flex items-center justify-center text-soft-red font-bold text-3xl md:text-5xl mb-2 ">
            <motion.span
                key={value}
                initial={{ scale: 0.9, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
            >
                {String(value).padStart(2, '0')}
            </motion.span>
        </div>
        <span className="text-gray-500 font-bold text-lg tracking-widest uppercase text-[10px] md:text-xs bg-white p-2 rounded-lg">{label}</span>
    </div>
);

export const CountdownTimer = ({ timeLeft }: CountdownTimerProps) => {
    return (
        <div className="flex justify-center items-center z-10 mt-8">
            {/* Days removed as requested */}
            <TimeUnit value={timeLeft.hours} label="Hrs" />
            <TimeUnit value={timeLeft.minutes} label="Mins" />
            <TimeUnit value={timeLeft.seconds} label="Secs" />
        </div>
    );
};
