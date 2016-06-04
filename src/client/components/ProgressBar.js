import React, { PropTypes } from 'react';

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
    .then(progress => this.setState({ progress }))
    .catch(err => console.log('ERR', err));
  }

  render() {
    return (
      <div className="progress-bar">
        <div className="progress">
          <div className="determinate" style={{ width: this.state.progress }}>
          </div>
        </div>
      </div>
    );
  }
}

ProgressBar.propTypes = {
  deck: PropTypes.object.isRequired,
};

export default ProgressBar;

