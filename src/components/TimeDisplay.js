import React from 'react';
import './TimeDisplay.css';

function TimeDisplay({ accumulatedTime, isEarning, isSpending, doubleSpeed }) {
  const childName = process.env.REACT_APP_CHILD_NAME || 'LUCAS';
  
  // Format seconds into HH:MM:SS
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0')
    ].join(':');
  };

  // Determine the status class for styling
  let statusClass = isEarning ? 'earning' : isSpending ? 'spending' : '';
  if (doubleSpeed) {
    statusClass += ' double-speed';
  }

  // Determine status text
  let statusText = 'Temporizador detenido';
  if (isEarning) {
    statusText = doubleSpeed ? '¡Ganando tiempo a 2x velocidad!' : 'Ganando tiempo...';
  } else if (isSpending) {
    statusText = doubleSpeed ? '¡Gastando tiempo a 2x velocidad!' : 'Gastando tiempo...';
  } else if (doubleSpeed) {
    statusText = 'Temporizador detenido (modo 2x activo)';
  }

  return (
    <div className={`time-display ${statusClass}`}>
      <h2>Tiempo Acumulado {childName}</h2>
      <div className="timer">{formatTime(accumulatedTime)}</div>
      <div className="status">{statusText}</div>
      {doubleSpeed && !isEarning && !isSpending && (
        <div className="speed-indicator">Modo 2x Activo</div>
      )}
    </div>
  );
}

export default TimeDisplay;
