import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCard, startPlay, flipCard, finishPlay } from '../actions';

const mapStateToProps = ({ deck, card, play }) => ({ deck, card, play });

const mapDispatchToProps = (dispatch) => ({
  getCard: (deck) => dispatch(fetchCard(deck)),
  startPlay: (cardId, deckId) => dispatch(startPlay(cardId, deckId)),
  flipCard: () => dispatch(flipCard()),
  finishPlay: (rating) => dispatch(finishPlay(rating)),
});

class StudyDeck extends React.Component {
  componentWillMount() {
    const props = this.props;
    props.getCard(props.deck._id)
      .then(({ data }) => props.startPlay(data._id, data.deckId));
  }

  completePlay() {

  }

  showFront() {
    const { card } = this.props;
    return (
      <section>
        <br />
        <br />
        <br />
        <h4>{(card.question && card.question.text) || null}</h4>
        <br />
        <br />
        <br />
        <div>
          <button
            onClick={this.props.flipCard}
            className="btn btn-large blue lighten-2"
          > Flip </button>
        </div>
      </section>
    );
  }

  showBack() {
    const { card } = this.props;
    return (
      <section>
        <br />
        <br />
        <br />
        <h4>{(card.answer && card.answer.text) || null}</h4>
        <br />
        <br />
        <br />
        <p>{(card.answer && card.answer.explanation) || null}</p>
        <div>
          <button onClick={this.props.finishPlay} className="btn btn-large blue lighten-2">
            <i className="material-icons">thumb_down</i>
          </button>
          <button onClick={this.props.finishPlay} className="btn btn-large blue lighten-2">
            <i className="material-icons">help</i>
          </button>
          <button onClick={this.props.finishPlay} className="btn btn-large blue lighten-2">
            <i className="material-icons">thumb_up</i>
          </button>
        </div>
      </section>
    );
  }

  render() {
    const { play, deck } = this.props;
    return (
      <div className="container">
        <h2 className="center grey-text text-darken-4">{deck.name}</h2>
        <div className="card medium center">
          {!play.side ? this.showFront() : this.showBack()}
        </div>
      </div>
    );
  }
}

StudyDeck.propTypes = {
  deck: PropTypes.object.isRequired,
  card: PropTypes.object.isRequired,
  play: PropTypes.object.isRequired,
  getCard: PropTypes.func.isRequired,
  startPlay: PropTypes.func.isRequired,
  flipCard: PropTypes.func.isRequired,
  finishPlay: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(StudyDeck);
