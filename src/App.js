import React, { useState, useEffect, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './Card/Card';
import DrawButton from './DrawButton/DrawButton';
import firebase from './Config/Firebase/db_config';

// firebase.firestore().collection('cards').add({
//   eng: 'love',
//   vn: 'yeu',
//   pin: 'yeu',
// });

const getRandomCard = (currentCards) => {
  const card = currentCards[Math.floor(Math.random() * currentCards.length)];
  return card;
};

function useCards() {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection('cards')
      .onSnapshot((snapshot) => {
        const newCards = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCards(newCards);
      });
  }, []);

  return cards;
}

function App() {
  const [currentCard, setCurrentCard] = useState({});
  const cards = useCards();

  useEffect(() => {
    setCurrentCard(getRandomCard(cards));
  }, [cards]);

  const _updateCard = useCallback(() => {
    setCurrentCard(getRandomCard(cards));
  }, [cards]);

  return (
    <div className='App'>
      <div className='cardRow'>
        <Card
          eng={currentCard?.eng}
          vn={currentCard?.vn}
          pin={currentCard?.pin}
        />
      </div>
      <div className='buttonRow'>
        <DrawButton onDrawCard={_updateCard} />
      </div>
    </div>
  );
}

export default App;
