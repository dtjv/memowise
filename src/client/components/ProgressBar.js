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
    fetch(`/api/deck/${deckId}/percent-complete`, {
      credentials: 'same-origin',
    })
    .then(res => res.json())
    .then(percentage => this.setState({ progress: percentage }));
    // .then((percentage) => {
    //   console.log(percentage, '<-- percentage');
    //   this.setState({ progress: percentage });
    // });
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
    _id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default ProgressBar;

