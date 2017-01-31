import { connect } from 'react-redux';
import { signUp, signIn } from '../actions';
import SignUp from '../components/SignUp';

const mapDispatchToProps = dispatch => ({
  signUp: user => dispatch(signUp(user)),
  signIn: (email, password) => dispatch(signIn(email, password)),
});

export default connect(null, mapDispatchToProps)(SignUp);
