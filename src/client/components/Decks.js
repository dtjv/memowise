import React from 'react';
import DeckItem from './DeckItem';
import $ from 'jquery';

class Decks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      decks: [],
      review: {},
    };
    this.getDecks = this.getDecks.bind(this);
  }

  componentDidMount() {
    this.getDecks();
  }

  getDecks() {
    $.getJSON('/api/decks').done((decks) => {
      // TODO: should use promises instead
      // add review deck to decks
      $.getJSON('/api/review').done((review) => {
        this.setState({ review, decks });
      });
    });
  }

  render() {
    return (
      <div className="container">
        <h4 className="center grey-text text-darken-4 " > Decks </h4>
        <div className="card-list">
          <section>
            <div className="card-columns">
              <DeckItem key={0} id={0} deck={this.state.review} />
              {this.state.decks.map((deck, idx) => <DeckItem key={idx + 1} id={idx + 1} deck={deck} />)}
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Decks;
