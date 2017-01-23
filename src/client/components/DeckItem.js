import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';
import { selectDeck } from '../actions';
import ProgressBar from './ProgressBar';
import DeckLastPlayed from './DeckLastPlayed';

const mapDispatchToState = dispatch => ({
  setDeckState: deck => dispatch(selectDeck(deck)),
});

class DeckItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastPlayedAt: '',
    };
    this.chooseDeckToStudy = this.chooseDeckToStudy.bind(this);
  }

  componentWillMount() {
    const payload = JSON.stringify({ deckId: this.props.deck._id });

    fetch('/api/play/last', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Content-length': payload.length,
      },
      credentials: 'same-origin',
      body: payload,
    })
    .then(res => res.json())
    .then((play) => {
      this.setState({
        lastPlayedAt: (play && play.createdAt) || '',
      });
    });
  }

  chooseDeckToStudy() {
    this.props.setDeckState(this.props.deck);
    browserHistory.push(`/decks/${this.props.deck._id}/study`);
  }

  render() {
    return (
      <div className="card-item">
        <div className="card-panel hoverable">
          <div className="card-content">
            <div className="card-title grey-text text-darken-4 center">
              <strong>{this.props.deck.name}</strong>
            </div>
            <DeckLastPlayed date={this.state.lastPlayedAt} />
            <ProgressBar deck={this.props.deck} />
            <div className="center">
              <button
                onClick={this.chooseDeckToStudy}
                className="btn cyan lighten-3"
              >
                Study
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DeckItem.propTypes = {
  deck: PropTypes.shape({
    _id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  setDeckState: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToState)(DeckItem);
