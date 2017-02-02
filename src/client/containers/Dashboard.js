import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';
import { fetchDecks } from '../actions';

const mapStateToProps = ({ decks }) => ({ decks });

const mapDispatchToProps = dispatch => ({
  fetchDecks: () => dispatch(fetchDecks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
