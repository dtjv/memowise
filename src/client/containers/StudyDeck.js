import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import ReactMarkdown from 'react-markdown';
import { GREAT, OKAY, BAD } from '../constants/play';
import { fetchCard, startPlay, flipCard, savePlay } from '../actions';

const mapStateToProps = ({ deck, card, play }) => ({ deck, card, play });

const mapDispatchToProps = (dispatch) => ({
  fetchCard: (deck) => dispatch(fetchCard(deck)),
  flipCard: () => dispatch(flipCard()),
  startPlay: (cardId, deckId) => dispatch(startPlay(cardId, deckId)),
  savePlay: (play, rating) => dispatch(savePlay(play, rating)),
});

class StudyDeck extends React.Component {
  constructor(props) {
    super(props);
    this.loadCard = this.loadCard.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
  }

  componentWillMount() {
    this.loadCard();
  }

  loadCard() {
    this.props.fetchCard(this.props.deck._id)
      .then(({ data }) => this.props.startPlay(data._id, data.deckId));
  }

  handlePlay(play, rank) {
    this.props.savePlay(play, rank)
      .then(() => this.loadCard());
  }

  showCardFront() {
    const { card: { question } } = this.props;
    return (
      <section>
        <div className="button-close">
          <i className="material-icons" onClick={() => browserHistory.push('/dashboard')}>close</i>
        </div>
        <ReactMarkdown source={(question && question.text) || ''} />
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

  showCardBack() {
    const { card: { answer }, play } = this.props;
    return (
      <section>
        <div className="button-close">
          <i className="material-icons" onClick={() => browserHistory.push('/dashboard')}>close</i>
        </div>
        <h4>{answer.text || null}</h4>
        <ReactMarkdown source={(answer && answer.text) || ''} />
        <br />
        <p><strong>Explanation:</strong></p>
        <ReactMarkdown source={(answer && answer.explanation) || ''} />
        <br />
        <p>How well did you do?</p>
        <div>
          <button
            onClick={() => this.handlePlay(play, BAD)}
            className="btn btn-large blue lighten-2"
          >
            <i className="material-icons">thumb_down</i>
          </button>
          <button
            onClick={() => this.handlePlay(play, OKAY)}
            className="btn btn-large blue lighten-2"
          >
            <i className="material-icons">help</i>
          </button>
          <button
            onClick={() => this.handlePlay(play, GREAT)}
            className="btn btn-large blue lighten-2"
          >
            <i className="material-icons">thumb_up</i>
          </button>
        </div>
      </section>
    );
  }

  render() {
    const { play: { side }, deck } = this.props;
    return (
      <div className="container">
        <h2 className="center grey-text text-darken-4">{deck.name}</h2>
        <div className="card medium center">
          {!side ? this.showCardFront() : this.showCardBack()}
        </div>
      </div>
    );
  }
}

StudyDeck.propTypes = {
  deck: PropTypes.object.isRequired,
  card: PropTypes.object.isRequired,
  play: PropTypes.object.isRequired,
  fetchCard: PropTypes.func.isRequired,
  flipCard: PropTypes.func.isRequired,
  startPlay: PropTypes.func.isRequired,
  savePlay: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(StudyDeck);
