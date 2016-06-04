import { connect } from 'react-redux';
import Decks from '../components/Decks';

const mapStateToProps = ({ decks }) => ({ decks });

export default connect(mapStateToProps)(Decks);
