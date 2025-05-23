import React, { useState } from 'react';
import './ButtonPanel.css';

function ButtonPanel({ onReset, onDoubleSpeed, onAddMinutes }) {
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [showAddMinutesModal, setShowAddMinutesModal] = useState(false);
  const [password, setPassword] = useState('');
  const [actionType, setActionType] = useState('');
  const [minutesToAdd, setMinutesToAdd] = useState(1);
  const correctPassword = process.env.REACT_APP_TIMER_PASSWORD || '1234';

  const handleResetClick = () => {
    setShowPasswordPrompt(true);
    setActionType('reset');
  };

  const handleDoubleSpeedClick = () => {
    setShowPasswordPrompt(true);
    setActionType('doubleSpeed');
  };

  const handleAddMinutesClick = () => {
    setShowPasswordPrompt(true);
    setActionType('addMinutes');
  };

  const handlePasswordSubmit = () => {
    if (password === correctPassword) {
      if (actionType === 'reset') {
        onReset();
      } else if (actionType === 'doubleSpeed') {
        onDoubleSpeed();
      } else if (actionType === 'addMinutes') {
        setShowAddMinutesModal(true);
      }
      setShowPasswordPrompt(false);
      setPassword('');
    } else {
      alert('Contraseña incorrecta');
    }
  };

  const handleCancel = () => {
    setShowPasswordPrompt(false);
    setPassword('');
  };

  const handleAddMinutesSubmit = () => {
    onAddMinutes(minutesToAdd);
    setShowAddMinutesModal(false);
    setMinutesToAdd(1);
  };

  const handleAddMinutesCancel = () => {
    setShowAddMinutesModal(false);
    setMinutesToAdd(1);
  };

  return (
    <div className="button-panel">
      <div className="button-container">
        <button className="reset-button" onClick={handleResetClick}>
          Reiniciar Temporizador
        </button>
        <button className="double-speed-button" onClick={handleDoubleSpeedClick}>
          Velocidad x2
        </button>
        <button className="add-minutes-button" onClick={handleAddMinutesClick}>
          Añadir Minutos
        </button>
      </div>
      
      {showPasswordPrompt && (
        <div className="password-prompt">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Introducir contraseña"
          />
          <div className="password-buttons">
            <button onClick={handlePasswordSubmit}>Enviar</button>
            <button onClick={handleCancel}>Cancelar</button>
          </div>
        </div>
      )}

      {showAddMinutesModal && (
        <div className="add-minutes-modal">
          <h3>Añadir Minutos</h3>
          <div className="minutes-input">
            <label>Minutos:</label>
            <input
              type="number"
              min="1"
              value={minutesToAdd}
              onChange={(e) => setMinutesToAdd(parseInt(e.target.value, 10) || 1)}
            />
          </div>
          <div className="modal-buttons">
            <button onClick={handleAddMinutesSubmit}>Añadir</button>
            <button onClick={handleAddMinutesCancel}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ButtonPanel;
