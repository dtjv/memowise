import React, { PropTypes } from 'react';
import { cancelAuthentication } from '../actions';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

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
