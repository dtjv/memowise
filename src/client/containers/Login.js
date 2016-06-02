import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(LoginForm);
