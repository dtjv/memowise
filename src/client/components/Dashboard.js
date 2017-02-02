import React, { PropTypes } from 'react';
import Deck from '../containers/Deck';

class Dashboard extends React.Component {
  componentWillMount() {
    this.props.fetchDecks();
  }

  render() {
    const { decks } = this.props;

    return (
      <div className="container">
        <h4 className="center grey-text text-darken-4"> Decks </h4>
        <div className="card-list">
          <div className="card-columns">
            {decks.map(deck => <Deck key={deck._id} deck={deck} />)}
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  decks: PropTypes.arrayOf(React.PropTypes.object),
  fetchDecks: PropTypes.func.isRequired,
};

Dashboard.defaultProps = {
  decks: [],
};

export default Dashboard;
