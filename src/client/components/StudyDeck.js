import React from 'react';

class StudyDeck extends React.Component {
  render() {
    return (
      <div className="container">
        <h2 className="center grey-text text-darken-4">check state!</h2>
        <div className="card-list">
          <section>
            <div className="card-columns">
            </div>
          </section>
        </div>
      </div>
    );
  }
}

// StudyDeck.propTypes = {
//   params: React.PropTypes.object.isRequired,
// };

export default StudyDeck;
