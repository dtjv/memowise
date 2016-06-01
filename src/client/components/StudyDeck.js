import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCard } from '../actions';

const mapStateToProps = ({ deck }) => ({ deck });

const mapDispatchToProps = (dispatch) => ({
  getCard: deck => dispatch(fetchCard(deck)),
});

class StudyDeck extends React.Component {
  componentDidMount() {
    this.props.getCard(this.props.deck._id);
  }

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

StudyDeck.propTypes = {
  deck: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  // play: PropTypes.shape({
  //   side: PropTypes.string.isRequired,
  //   deckId: PropTypes.string.isRequired,
  //   cardId: PropTypes.string.isRequired,
  //   // userId: PropTypes.string.isRequired,
  //   rating: PropTypes.number.isRequired,
  // }),
  getCard: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(StudyDeck);
