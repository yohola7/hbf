import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const FloatingStickers = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const options: ISourceOptions = {
        background: {
            color: {
                value: "transparent",
            },
        },
        fpsLimit: 60,
        particles: {
            color: {
                value: ["#FF6B6B", "#F4D35E", "#FFB6B6"], // Theme colors
            },
            move: {
                enable: true,
                speed: 0.8, // Slower, calmer
                direction: "none",
                random: true,
                straight: false,
                outModes: {
                    default: "out",
                },
            },
            number: {
                density: {
                    enable: true,
                    width: 800,
                    height: 800,
                },
                value: 15, // Fewer particles for cleaner look
            },
            opacity: {
                value: 0.6,
                random: true,
            },
            shape: {
                type: ["circle"], // Can add heart info here if we add shape plugin
            },
            size: {
                value: { min: 3, max: 8 },
            },
        },
        detectRetina: true,
    };

    if (!init) return null;

    return (
        <Particles
            id="tsparticles"
            options={options}
            className="absolute inset-0 -z-10"
        />
    );
};

export default FloatingStickers;
