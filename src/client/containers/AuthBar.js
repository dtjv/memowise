import { connect } from 'react-redux';
import AuthBar from '../components/AuthBar';

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(AuthBar);
