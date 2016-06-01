import { connect } from 'react-redux';
import Decks from '../components/Decks';

// destructures `state` parameter and returns an object with
// a property to be placed on `props` that's passed into the
// Decks component.
const mapStateToProps = ({ decks }) => ({ decks });

export default connect(mapStateToProps)(Decks);
