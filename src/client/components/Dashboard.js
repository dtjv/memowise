import React, { PropTypes } from 'react';
import Deck from '../containers/Deck';

const Dashboard = ({ decks }) => (
  <div className="container">
    <h4 className="center grey-text text-darken-4"> Decks </h4>
    <div className="card-list">
      <div className="card-columns">
        {decks.map(deck => <Deck key={deck._id} deck={deck} />)}
      </div>
    </div>
  </div>
);

Dashboard.propTypes = {
  decks: PropTypes.arrayOf(React.PropTypes.object),
};

Dashboard.defaultProps = {
  decks: [],
};

export default Dashboard;
