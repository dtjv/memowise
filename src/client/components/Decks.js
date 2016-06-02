import React, { PropTypes } from 'react';
import DeckItem from './DeckItem';

const Decks = ({ decks }) => (
  <div className="container">
    <h4 className="center grey-text text-darken-4"> Decks </h4>
    <div className="card-list">
      <div className="card-columns">
        <DeckItem key={0} id={0} deck={{ name: 'Review' }} />
        {decks.map((deck, idx) => <DeckItem key={idx} id={idx + 1} deck={deck} />)}
      </div>
    </div>
  </div>
);

Decks.propTypes = {
  decks: PropTypes.array.isRequired,
};

export default Decks;
