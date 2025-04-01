import { useState, useEffect } from 'react';

const useTimer = (isRunning: boolean, onReset: boolean) => {
    const [elapsedTime, setElapsedTime] = useState(0);
    
    /*
    - let timerInterval: Declared a local variable named timerInterval that can be reassigned later
    - NodeJS.Timeout: a timeout ID when using setInterval() in a Node.js environment.
    - NodeJS.Timeout | null: timerInterval could be NodeJS.Timeout or null
    - = null: initialized timerInterval with null, meaning there is no timer running initially
    */
    let timerInterval: NodeJS.Timeout | null = null;

    useEffect(() => {
        if (isRunning) {
            timerInterval = setInterval(() => {
                setElapsedTime((prev) => prev + 1); // Increment every second
            }, 1000);
        } else {
            if (timerInterval) clearInterval(timerInterval);
        }

        return () => {
            if (timerInterval) clearInterval(timerInterval);
        };
    }, [isRunning]); // the square brackets define dependencies for the effect

    useEffect(() => {
        if (onReset) {
            setElapsedTime(0); // Reset timer when long-press
        }
    }, [onReset]); // it tells React to only run this function when onReset changes

    return elapsedTime;
};

export default useTimer;