import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import ProgressBar from './ProgressBar';
import DeckLastPlayed from './DeckLastPlayed';

class Deck extends Component {
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
    this.props.selectDeck(this.props.deck);
    browserHistory.push(`/decks/${this.props.deck._id}/study`);
  }

  render() {
    return (
      <div className="card-item">
        <div className="card-panel hoverable">
          <div className="card-content">
            <div className="card-title grey-text text-darken-4 center">
              <h4>{this.props.deck.name}</h4>
            </div>
            <DeckLastPlayed date={this.state.lastPlayedAt} />
            <ProgressBar deck={this.props.deck} />
            <div className="center">
              <button
                id={`deck${this.props.idx}`}
                onClick={this.chooseDeckToStudy}
                className="btn blue"
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

Deck.propTypes = {
  deck: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  idx: PropTypes.number.isRequired,
  selectDeck: PropTypes.func.isRequired,
};

export default Deck;
