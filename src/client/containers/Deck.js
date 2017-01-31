import { connect } from 'react-redux';
import Deck from '../components/Deck';
import { selectDeck } from '../actions';

const mapDispatchToState = dispatch => ({
  selectDeck: deck => dispatch(selectDeck(deck)),
});

export default connect(null, mapDispatchToState)(Deck);
