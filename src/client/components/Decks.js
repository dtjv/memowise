import React, { PropTypes } from 'react';
import DeckItem from './DeckItem';

const Decks = ({ decks }) => (
  <div className="container">
    <h4 className="center grey-text text-darken-4"> Decks </h4>
    <div className="card-list">
      <div className="card-columns">
        {decks.map(deck => <DeckItem key={deck._id} deck={deck} />)}
      </div>
    </div>
  </div>
);

Decks.propTypes = {
  decks: PropTypes.arrayOf.isRequired,
};

export default Decks;
