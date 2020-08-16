import React, { useState, useEffect, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './Card/Card';
import DrawButton from './DrawButton/DrawButton';
import firebase from './Config/Firebase/db_config';
import CardList from './CardList';
import AddCard from './AddCard';

const SORT_OPTIONS = {
  ASC: { column: 'eng', direction: 'asc' },
  DESC: { column: 'eng', direction: 'desc' },
};

const getRandomCard = (currentCards) => {
  const card = currentCards[Math.floor(Math.random() * currentCards.length)];
  return card;
};

function useCards(sortBy = 'DESC') {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection('cards')
      .orderBy(SORT_OPTIONS[sortBy].column, SORT_OPTIONS[sortBy].direction)
      .onSnapshot((snapshot) => {
        const newCards = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCards(newCards);
      });
  }, [sortBy]);

  return cards;
}

function App() {
  const [currentCard, setCurrentCard] = useState({});
  const [sortBy, setSortBy] = useState('DESC');
  const cards = useCards(sortBy);

  console.log({ cards });

  useEffect(() => {
    setCurrentCard(getRandomCard(cards));
  }, [cards]);

  const _updateCard = useCallback(() => {
    setCurrentCard(getRandomCard(cards));
  }, [cards]);

  return (
    <div className='App'>
      <div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.currentTarget.value)}>
          <option value='DESC'>DESC</option>
          <option value='ASC'>ASC</option>
        </select>
      </div>
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
      <div>
        <AddCard />
      </div>
      <div className='cardList'>
        <CardList data={cards} />
      </div>
    </div>
  );
}

export default App;
