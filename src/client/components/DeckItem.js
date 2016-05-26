import React from 'react';
import { Link } from 'react-router';

const DeckItem = ({ deck }) => (
  <li>
    <Link to={`/deck/${deck.id}`}>
      {${deck.}
      {' '}
      <span className="email">
        {contact.get('email')}
      </span>
    </Link>
  </li>
);

DeckItem.propTypes = {
  // deck will be an object
  deck: React.PropTypes.number.isRequired,
};

export default DeckItem;
