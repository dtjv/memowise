import { connect } from 'react-redux';
import StudyDeck from '../components/StudyDeck';
import { fetchCard, startPlay, flipCard, savePlay } from '../actions';

const mapStateToProps = ({ deck, card, play }) => ({ deck, card, play });

const mapDispatchToProps = (dispatch) => ({
  fetchCard: (deck) => dispatch(fetchCard(deck)),
  flipCard: () => dispatch(flipCard()),
  startPlay: (cardId, deckId) => dispatch(startPlay(cardId, deckId)),
  savePlay: (play, rating) => dispatch(savePlay(play, rating)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudyDeck);
