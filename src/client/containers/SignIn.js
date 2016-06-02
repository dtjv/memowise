import { connect } from 'react-redux';
import { signIn } from '../actions';
import SignIn from '../components/SignIn';

const mapStateToProps = props => (props);
const mapDispatchToProps = (dispatch) => ({
  onSignIn: user => {
    dispatch(signIn(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
