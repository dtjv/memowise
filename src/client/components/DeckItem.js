import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// @TODO: we're passing in a makeshift `id` that is not related to the
// deck._id. I think we should use deck._id.
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
  deck: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  id: PropTypes.number.isRequired,
};

export default DeckItem;
