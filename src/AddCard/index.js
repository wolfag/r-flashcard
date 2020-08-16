import React, { useState } from 'react';
import firebase from '../Config/Firebase/db_config';

function AddCard({}) {
  const [eng, setEng] = useState('');
  const [vn, setVn] = useState('');
  const [pin, setPin] = useState('');
  const _onSubmit = (e) => {
    e.preventDefault();

    firebase
      .firestore()
      .collection('cards')
      .add({
        eng,
        vn,
        pin,
      })
      .then(() => {
        setEng('');
        setPin('');
        setVn('');
      });
  };
  return (
    <form onSubmit={_onSubmit}>
      <div>
        <label>English</label>
        <input
          type='text'
          value={eng}
          onChange={(e) => setEng(e.currentTarget.value)}
        />
      </div>
      <div>
        <label>VN</label>
        <input
          type='text'
          value={vn}
          onChange={(e) => setVn(e.currentTarget.value)}
        />
      </div>
      <div>
        <label>Pin</label>
        <input
          type='text'
          value={pin}
          onChange={(e) => setPin(e.currentTarget.value)}
        />
      </div>
      <button>Add</button>
    </form>
  );
}
export default AddCard;
