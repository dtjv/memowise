import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Login from '../components/Login';

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = (dispatch) => ({
  onSignIn: () => {
    dispatch(push('/dashboard'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
