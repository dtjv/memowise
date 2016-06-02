import React from 'react';
import $ from 'jquery';

// goes into DeckItem
class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      perc: '0%'
    };
    this.getProgress = this.getProgress.bind(this);
    this.deckId = this.props.id;
  }

  componentDidMount() {
    this.getProgress();
  }

  getProgress() {
    $.getJSON(`/api/progress/${this.deckId}`)
      .done( perc => {
        this.setState({ perc: (perc*100 + '%') });
      });
  }

  render() {

    return (
      <div className="progress-bar">
        <div className="progress">
          <div className="determinate" style={{width: this.state.perc }}>
          </div>
        </div>
      </div>
    );
  }
};

ProgressBar.propTypes = {
  id: React.PropTypes.string.isRequired,
};

export default ProgressBar;
