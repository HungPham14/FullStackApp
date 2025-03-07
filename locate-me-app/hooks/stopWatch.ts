import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setTime(time => time + 1);
      }, 1000)};

    return () => clearInterval(timer);
  }, [isRunning]);

//   console.log('Time:', time);
  return { time };
};

export default Stopwatch;