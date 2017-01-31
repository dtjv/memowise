import { connect } from 'react-redux';
import MenuBar from '../components/MenuBar';
import { signOut } from '../actions';

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
