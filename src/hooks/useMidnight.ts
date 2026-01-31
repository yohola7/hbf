import { useState, useEffect } from 'react';

import { differenceInSeconds } from 'date-fns';



export const useMidnight = () => {
    const [isMidnight, setIsMidnight] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTarget = () => {
            const now = new Date();
            const currentYear = now.getFullYear();
            // Target: Feb 1st of current year
            let target = new Date(currentYear, 1, 1, 0, 0, 0); // Month is 0-indexed: 1 = Feb

            // If we are past Feb 1st this year, target next year?
            // User request implies "Birthday Website", so likely upcoming.
            // If today is AFTER Feb 1st, we target next year.
            if (now > target) {
                target = new Date(currentYear + 1, 1, 1, 0, 0, 0);
            }
            return target;
        };

        const target = calculateTarget(); // Real target
        // const target = new Date(Date.now() + 10 * 1000); // TESTING: 10 seconds

        // Wait, I cannot redeclare 'target'. I should comment out the real one or use let.
        // Let's modify the code to be cleaner for switching.

        // FOR TESTING: Overwrite target
        // target = new Date(Date.now() + 10 * 1000); // This won't work because it's const.

        // I will change the calculate logic or just hard swap the line.

        const checkTime = () => {
            const now = new Date();
            const diff = differenceInSeconds(target, now);

            if (diff <= 0) {
                setIsMidnight(true);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                setIsMidnight(false);
                const days = Math.floor(diff / (3600 * 24));
                const hours = Math.floor((diff % (3600 * 24)) / 3600);
                const minutes = Math.floor((diff % 3600) / 60);
                const seconds = diff % 60;
                setTimeLeft({ days, hours, minutes, seconds });
            }
        };

        checkTime(); // Initial check
        const interval = setInterval(checkTime, 1000);

        return () => clearInterval(interval);
    }, []);

    return { isMidnight, timeLeft };
};
