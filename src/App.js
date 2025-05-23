import React, { useState, useEffect } from 'react';
import './App.css';
import TimeDisplay from './components/TimeDisplay';
import TimerSection from './components/TimerSection';
import ButtonPanel from './components/ButtonPanel';

function App() {
  const [accumulatedTime, setAccumulatedTime] = useState(0);
  const [isEarning, setIsEarning] = useState(false);
  const [isSpending, setIsSpending] = useState(false);
  const [doubleSpeed, setDoubleSpeed] = useState(false);
  
  // Load accumulated time from localStorage on initial render
  useEffect(() => {
    const savedTime = localStorage.getItem('accumulatedTime');
    if (savedTime) {
      setAccumulatedTime(parseInt(savedTime, 10));
    }
  }, []);
  
  // Save accumulated time to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('accumulatedTime', accumulatedTime.toString());
  }, [accumulatedTime]);
  
  const handleEarnStart = () => {
    setIsEarning(true);
    setIsSpending(false);
  };
  
  const handleEarnStop = () => {
    setIsEarning(false);
  };
  
  const handleSpendStart = () => {
    // Only allow spending if there's time accumulated
    if (accumulatedTime > 0) {
      setIsSpending(true);
      setIsEarning(false);
    }
  };
  
  const handleSpendStop = () => {
    setIsSpending(false);
  };
  
  const updateAccumulatedTime = (newTime) => {
    setAccumulatedTime(newTime);
  };
  
  const resetTimer = () => {
    setAccumulatedTime(0);
    setIsEarning(false);
    setIsSpending(false);
    setDoubleSpeed(false);
  };
  
  const toggleDoubleSpeed = () => {
    setDoubleSpeed(!doubleSpeed);
  };
  
  const resetSpeed = () => {
    setDoubleSpeed(false);
  };
  
  const addMinutes = (minutes) => {
    // Convert minutes to seconds and add to accumulated time
    const secondsToAdd = minutes * 60;
    setAccumulatedTime(accumulatedTime + secondsToAdd);
  };
  
  return (
    <div className="app">
      <TimeDisplay 
        accumulatedTime={accumulatedTime} 
        isEarning={isEarning} 
        isSpending={isSpending}
        doubleSpeed={doubleSpeed}
      />
      
      <div className="timer-container">
        <TimerSection 
          title="Ganar Tiempo"
          buttonText={isEarning ? "Detener" : "Iniciar"}
          isActive={isEarning}
          onStart={handleEarnStart}
          onStop={handleEarnStop}
          accumulatedTime={accumulatedTime}
          updateAccumulatedTime={updateAccumulatedTime}
          mode="earn"
          doubleSpeed={doubleSpeed}
        />
        
        <TimerSection 
          title="Gastar Tiempo"
          buttonText={isSpending ? "Detener" : "Iniciar"}
          isActive={isSpending}
          onStart={handleSpendStart}
          onStop={handleSpendStop}
          accumulatedTime={accumulatedTime}
          updateAccumulatedTime={updateAccumulatedTime}
          mode="spend"
          disabled={accumulatedTime <= 0}
          doubleSpeed={doubleSpeed}
        />
      </div>
      
      <ButtonPanel 
        onReset={resetTimer} 
        onDoubleSpeed={toggleDoubleSpeed} 
        onAddMinutes={addMinutes}
        onResetSpeed={resetSpeed}
      />
    </div>
  );
}

export default App;
