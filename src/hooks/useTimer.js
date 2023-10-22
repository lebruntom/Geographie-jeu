import { useState, useEffect } from "react";

const useTimer = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const secondsToHms = (secs) => {
    let minutes = Math.floor(secs / 60);
    let seconds = secs - minutes * 60;
    return `${minutes ? `${minutes}m` : ""}${seconds ? `${seconds}s` : ""}`;
  };

  const startTimer = () => {
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setTime(0);
    setIsActive(false);
  };

  return {
    time: secondsToHms(time),
    startTimer,
    stopTimer,
    resetTimer,
  };
};

export default useTimer;
