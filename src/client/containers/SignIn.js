import { connect } from 'react-redux';
import { signIn } from '../actions';
import SignIn from '../components/SignIn';

const mapDispatchToProps = dispatch => ({
  signIn: (email, password) => dispatch(signIn(email, password)),
});

export default connect(null, mapDispatchToProps)(SignIn);
