import React, { PropTypes } from 'react';
import DeckItem from './DeckItem';

const Decks = ({ decks }) => (
  <div className="container">
    <h4 className="center grey-text text-darken-4"> Decks </h4>
    <div className="card-list">
      <div className="card-columns">
        {decks.map((deck, idx) => <DeckItem key={idx} deck={deck} />)}
      </div>
    </div>
  </div>
);

Decks.propTypes = {
  decks: PropTypes.array.isRequired,
};

export default Decks;
