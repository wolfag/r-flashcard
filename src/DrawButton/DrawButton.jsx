import React, { useCallback } from 'react';
import './DrawButton.css';

function DrawButton({ onDrawCard }) {
  const _onDrawCard = useCallback(() => {
    onDrawCard();
  }, [onDrawCard]);

  return (
    <div className='button-container'>
      <button className='btn' onClick={_onDrawCard}>
        Draw Card
      </button>
    </div>
  );
}

export default DrawButton;
