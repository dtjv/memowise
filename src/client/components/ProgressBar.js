import React, { PropTypes } from 'react';
import fetch from 'isomorphic-fetch';

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: '0%',
    };
    this.deckId = this.props.deck._id;
    this.loadProgress = this.loadProgress.bind(this);
  }

  componentDidMount() {
    this.loadProgress(this.deckId);
  }

  loadProgress(deckId) {
    const payload = JSON.stringify({ deckId });
    fetch('api/progress', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Content-length': payload.length,
      },
      credentials: 'same-origin',
      body: payload,
    })
    .then(res => res.json())
    .then(progress => this.setState({ progress }));
  }

  render() {
    return (
      <div className="progress-bar">
        <div className="progress">
          <div className="determinate" style={{ width: this.state.progress }} />
        </div>
      </div>
    );
  }
}

ProgressBar.propTypes = {
  deck: PropTypes.shape({
    _id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
};

export default ProgressBar;

