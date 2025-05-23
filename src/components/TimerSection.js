import React, { useEffect, useRef } from 'react';
import './TimerSection.css';

function TimerSection({
  title,
  buttonText,
  isActive,
  onStart,
  onStop,
  accumulatedTime,
  updateAccumulatedTime,
  mode,
  disabled,
  doubleSpeed
}) {
  const timerRef = useRef(null);
  
  useEffect(() => {
    if (isActive) {
      // Set up interval to update time
      timerRef.current = setInterval(() => {
        if (mode === 'earn') {
          // Add time when earning (double if doubleSpeed is active)
          const increment = doubleSpeed ? 2 : 1;
          updateAccumulatedTime(accumulatedTime + increment);
        } else if (mode === 'spend') {
          // Subtract time when spending (double if doubleSpeed is active)
          const decrement = doubleSpeed ? 2 : 1;
          const newTime = accumulatedTime - decrement;
          // Ensure time doesn't go below zero
          const adjustedNewTime = Math.max(0, newTime);
          updateAccumulatedTime(adjustedNewTime);
          
          // Stop timer if time runs out
          if (adjustedNewTime <= 0) {
            onStop();
          }
        }
      }, 1000);
    } else if (timerRef.current) {
      // Clear interval when not active
      clearInterval(timerRef.current);
    }
    
    // Clean up interval on unmount or when active state changes
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, accumulatedTime, mode, updateAccumulatedTime, onStop, doubleSpeed]);
  
  const handleButtonClick = () => {
    if (isActive) {
      onStop();
    } else {
      onStart();
    }
  };
  
  return (
    <div className={`timer-section ${mode}`}>
      <h2>{title}</h2>
      <button 
        className="timer-button"
        onClick={handleButtonClick}
        disabled={disabled && !isActive}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default TimerSection;
