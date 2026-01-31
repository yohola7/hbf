import { motion } from 'framer-motion';
import TitasPhoto from '../assets/photos/titas-photo.png';
interface BirthdayRevealCardProps {
    message: string;
}

const StarSticker = ({ text, className, rotate, delay = 0.5 }: { text: React.ReactNode; className?: string; rotate: number, delay?: number }) => (
    <motion.div
        initial={{ scale: 0, rotate: rotate - 20 }}
        animate={{ scale: 1, rotate: rotate }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay }}
        className={`absolute flex items-center justify-center ${className}`}
        style={{ zIndex: 30 }}
    >
        <svg viewBox="0 0 100 100" className="w-28 h-28 drop-shadow-md text-iron-gold fill-current">
            <polygon points="50 0 61 35 98 35 68 57 79 91 50 70 21 91 32 57 2 35 39 35" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center leading-none pb-1">
            {text}
        </div>
    </motion.div>
);

const TapeSticker = ({ text, className, rotate }: { text: string; className?: string; rotate: number }) => (
    <motion.div
        initial={{ scale: 0, opacity: 0, x: -20 }}
        animate={{ scale: 1, opacity: 1, x: 0 }}
        transition={{ delay: 0.7, type: "spring" }}
        className={`absolute bg-pink-500 text-white px-4 py-1 font-black tracking-widest text-xl transform shadow-md z-40 ${className}`}
        style={{ rotate: `${rotate}deg` }}
    >
        {text}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/20 border-r border-dashed border-white/40"></div>
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/20 border-l border-dashed border-white/40"></div>
    </motion.div>
);

const CupcakeSticker = () => (
    <motion.div
        initial={{ scale: 0, rotate: 20 }}
        animate={{ scale: 1, rotate: 10 }}
        transition={{ delay: 1.2, type: "spring" }}
        className="relative bottom-52 left-64 z-40"
    >
        {/* Cute Cupcake with "22" */}
        <div className="relative w-20 h-24">
            {/* Age Heart */}
            <div className="absolute -top-4 -right-2 text-red-500 z-50 animate-bounce">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-sm pt-0.5">22</span>
            </div>

            <div className="w-16 h-12 bg-pink-300 rounded-t-full mx-auto relative overflow-hidden">
                <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full opacity-50"></div>
                <div className="absolute top-4 right-4 w-2 h-2 bg-red-400 rounded-full"></div>
            </div>
            <div className="w-16 h-10 bg-yellow-600 mx-auto rounded-b-lg relative" style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 15% 100%)" }}>
                <div className="w-full h-full opacity-20 bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,#000_4px,#000_5px)]"></div>
            </div>
        </div>
    </motion.div>
);

export const BirthdayRevealCard = ({ message }: BirthdayRevealCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-[90vw] max-w-[340px] md:max-w-lg mx-auto p-4 md:p-8 pt-12"
        >
            <div className="">
                {/* Main Photo Container - Tilted photo aesthetic */}
                <div className="relative bg-[#eee] p-3 md:p-4 pb-10 md:pb-12 shadow-[5px_5px_15px_rgba(0,0,0,0.2)] transform rotate-2 max-w-sm mx-auto transition-transform hover:rotate-0 duration-500">
                    {/* Tape effect */}
                    <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 w-24 md:w-32 h-6 md:h-8 bg-white/40 transform -rotate-1 z-20 backdrop-blur-sm shadow-sm border-l border-r border-white/60"></div>

                    <div className="relative overflow-hidden border-2 border-gray-200 filter contrast-125 brightness-110 transition-all duration-1000">
                        <img
                            src={TitasPhoto}
                            alt="Birthday Girl"
                            className="w-full h-auto aspect-[4/5] object-cover"
                        />

                        {/* Grain & Scratches overlay */}
                        <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none mix-blend-overlay"></div>
                        <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] pointer-events-none"></div>
                    </div>
                </div>

                {/* ---> STICKER LAYER <--- */}

                {/* 1. Star Sticker: "FEB 01" */}
                <StarSticker
                    text={<><span className="text-sm font-bold block text-white">FEB</span><span className="text-3xl font-black text-white">01</span></>}
                    className="-top-2 -left-2 md:-top-4 md:-left-6 scale-75 md:scale-100 origin-bottom-right"
                    rotate={-15}
                    delay={0.6}
                />

                {/* 2. Tape Sticker: "TITAS" - The Name Tag */}
                <TapeSticker text="TITAS" className="-right-4 md:-right-8 top-8 md:top-12 scale-90 md:scale-100 origin-left" rotate={5} />

                {/* 3. Broken Text: "BIRTH DAY" */}
                <motion.div
                    className="relative bottom-4 md:bottom-32 -left-4 md:-left-12 z-30 font-black text-3xl md:text-4xl text-iron-red leading-none font-gaegu drop-shadow-sm transform -rotate-6 origin-top-right"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                >
                    <span className="block bg-white px-1 inline-block transform -rotate-3 mb-1 shadow-sm">BIRTH</span><br />
                    <span className="block bg-white px-1 inline-block transform rotate-2 ml-4 shadow-sm">DAY</span>
                </motion.div>

                {/* 4. Cupcake with "22" */}
                <div className="transform scale-75 md:scale-100 origin-bottom-left">
                    <CupcakeSticker />
                </div>

                {/* Decorative scribbles */}
                <div className="absolute top-6 right-[-20px] w-8 h-8 rounded-full border-2 border-dashed border-blue-400 opacity-60 pointer-events-none animate-spin-slow"></div>
            </div>
            {/* Bottom Caption message */}
            <div className=" relative bottom-16 md:bottom-32 mt-6 md:mt-8 text-center max-w-[320px] md:max-w-[320px] mx-auto z-40">
                <p className="font-gaegu text-xl md:text-2xl text-gray-800 font-bold tracking-wide transform -rotate-1 leading-snug">
                    <span className="block bg-pink-100/90 px-1 inline-block transform -rotate-1 mb-1 shadow-sm"> {message || "i HOPE you spend your BIRTHDAY happily 💛"}</span><br />

                </p>
                <div className="w-20 md:w-24 h-1 bg-yellow-300 mx-auto mt-2 transform -rotate-1 opacity-70 rounded-full"></div>
            </div>

        </motion.div>
    );
};


