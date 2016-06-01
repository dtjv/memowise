import React, { Component, PropTypes } from 'react';
import { selectDeck } from '../actions';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

const mapDispatchToState = (dispatch) => ({
  selectedDeck: (deck) => dispatch(selectDeck(deck)),
});

class DeckItem extends Component {
  constructor(props) {
    super(props);
    this.chooseDeckToStudy = this.chooseDeckToStudy.bind(this);
  }

  chooseDeckToStudy() {
    this.props.selectedDeck(this.props.deck);
    browserHistory.push(`/decks/${this.props.id}/study`);
  }

  render() {
    return (
      <div className="card-item">
        <div className="card-panel hoverable">
          <div className="card-content">
            <div className="card-title grey-text text-darken-4 center">
              <strong>{this.props.deck.name}</strong>
            </div>
            <div className="center">
              <button onClick={this.chooseDeckToStudy} className="btn blue lighten-2">
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
    name: PropTypes.string.isRequired,
  }),
  id: PropTypes.number.isRequired,
  selectedDeck: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToState)(DeckItem);
