import React from 'react';
import './Card.css';

function Card({ eng, vn, pin }) {
  return (
    <div className='card-container'>
      <div className='card'>
        <div className='front'>
          <div className='eng'>{eng}</div>
        </div>
        <div className='back'>
          <div className='vn'>{vn}</div>
          <div className='pin'>{pin}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
