import React, { Component, PropTypes } from 'react';
import { selectDeck } from '../actions';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import ProgressBar from './ProgressBar';
import DeckLastPlayed from './DeckLastPlayed';

const mapDispatchToState = (dispatch) => ({
  setDeckState: (deck) => dispatch(selectDeck(deck)),
});

class DeckItem extends Component {
  constructor(props) {
    super(props);
    this.chooseDeckToStudy = this.chooseDeckToStudy.bind(this);
    this.state = {
      lastPlayedAt: '',
    };
  }

  componentWillMount() {
    fetch(`/api/last-play/deck/${this.props.deck._id}`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(play => {
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
              <button onClick={this.chooseDeckToStudy} className="btn cyan lighten-3">
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
  deck: PropTypes.object.isRequired,
  setDeckState: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToState)(DeckItem);
