import { connect } from 'react-redux';
import { signIn } from '../actions';
import SignUp from '../components/SignUp';

const mapDispatchToProps = dispatch => ({
  signIn: (email, password) => dispatch(signIn(email, password)),
});

export default connect(null, mapDispatchToProps)(SignUp);
