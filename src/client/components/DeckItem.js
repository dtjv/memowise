import React from 'react';
import { Link } from 'react-router';

const DeckItem = ({ id, deck }) => (
  <div className="card-item">
    <div className="card-panel hoverable">
      <div className="card-content">
        <div className="card-title grey-text text-darken-4 center">
          <strong>{deck.name}</strong>
        </div>
        <div className="center">
          <Link to={`/decks/${id}/study`} className="btn blue lighten-2"> Study </Link>
        </div>
      </div>
    </div>
  </div>
);

DeckItem.propTypes = {
  deck: React.PropTypes.object.isRequired,
  id: React.PropTypes.number.isRequired,
};

export default DeckItem;
