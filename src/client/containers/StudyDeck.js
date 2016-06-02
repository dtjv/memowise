import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCard, startPlay, flipCard, finishPlay } from '../actions';

const mapStateToProps = ({ deck, card, play }) => ({ deck, card, play });

const mapDispatchToProps = (dispatch) => ({
  getCard: (deck) => dispatch(fetchCard(deck)),
  setPlayStart: (cardId, deckId) => dispatch(startPlay(cardId, deckId)),
  setPlayFlipCard: () => dispatch(flipCard()),
  setPlayFinish: (rating) => dispatch(finishPlay(rating)),
});

class StudyDeck extends React.Component {
  constructor(props) {
    super(props);
    this.loadCard = this.loadCard.bind(this);
    this.completePlay = this.completePlay.bind(this);
  }

  componentWillMount() {
    this.loadCard();
  }

  loadCard() {
    const props = this.props;
    props.getCard(props.deck._id)
      .then(({ data }) => props.setPlayStart(data._id, data.deckId));
  }

  // i have not persisted plays!!
  completePlay(event) {
    const el = event.target;
    const rating = el.dataset.rating || 0;
    this.props.setPlayFinish(rating)
      .then(() => this.loadCard());
  }

  showCardFront() {
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
            onClick={this.props.setPlayFlipCard}
            className="btn btn-large blue lighten-2"
          > Flip </button>
        </div>
      </section>
    );
  }

  showCardBack() {
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
          <button onClick={this.completePlay} className="btn btn-large blue lighten-2">
            <i ref="play-bad" data-rating="-1" className="material-icons">thumb_down</i>
          </button>
          <button onClick={this.completePlay} className="btn btn-large blue lighten-2">
            <i ref="play-okay" data-rating="0" className="material-icons">help</i>
          </button>
          <button onClick={this.completePlay} className="btn btn-large blue lighten-2">
            <i ref="play-good" data-rating="1" className="material-icons">thumb_up</i>
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
          {!play.side ? this.showCardFront() : this.showCardBack()}
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
  setPlayStart: PropTypes.func.isRequired,
  setPlayFlipCard: PropTypes.func.isRequired,
  setPlayFinish: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(StudyDeck);
