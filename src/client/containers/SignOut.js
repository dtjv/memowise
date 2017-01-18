import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { cancelAuthentication } from '../actions';

class LogoutView extends React.Component {
  componentWillMount() {
    this.props.dispatch(cancelAuthentication());
  }

  componentDidMount() {
    browserHistory.push('/');
  }

  render() {
    return null;
  }
}

LogoutView.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(LogoutView);
