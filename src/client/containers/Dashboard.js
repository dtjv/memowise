import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';

const mapStateToProps = ({ decks }) => ({ decks });

export default connect(mapStateToProps)(Dashboard);
