import { connect } from 'react-redux';
import { signIn } from '../actions';
import SignUp from '../components/SignUp';
import { signUp } from '../services/UserService';

const mapDispatchToProps = dispatch => ({
  signUp: user => signUp(user),
  signIn: (email, password) => dispatch(signIn(email, password)),
});

export default connect(null, mapDispatchToProps)(SignUp);
