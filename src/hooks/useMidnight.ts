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

            // If now is past target, we check if it is still the same day (Feb 1st)
            // If it IS Feb 1st, we keep the target as is (so diff is negative -> isMidnight = true)
            // Only if it is AFTER Feb 1st do we move to next year.
            const isFeb1st = now.getMonth() === 1 && now.getDate() === 1;

            if (now > target && !isFeb1st) {
                target = new Date(currentYear + 1, 1, 1, 0, 0, 0);
            }
            return target;
        };

        const target = calculateTarget(); // Real target


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
