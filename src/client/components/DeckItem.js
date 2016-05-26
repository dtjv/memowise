import React from 'react';
import { Link } from 'react-router';

const DeckItem = ({ deck }) => (
  <div className="card-item">
    <div className="card-panel hoverable">
      <div className="card-content">
        <div className="card-title grey-text text-darken-4 center">
          <strong>{deck.topic}</strong>
        </div>
        <div className="center">
          <Link to={`/deck/${deck.id}`} className="btn blue lighten-2"> Play </Link>
        </div>
      </div>
    </div>
  </div>
);

DeckItem.propTypes = {
  deck: React.PropTypes.object.isRequired,
};

export default DeckItem;
