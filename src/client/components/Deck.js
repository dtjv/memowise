import React from 'react';
import $ from 'jquery';
import CardItem from './CardItem';

class Deck extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: {},
    };

    this.getDeck = this.getDeck.bind(this);
  }

  componentDidMount() {
    this.getDeck();
  }

  getDeck() {
    $.getJSON(`/api/decks/${this.props.params.deckId}`)
      .done((deck) => {
        this.setState({ deck });
      });
  }

  render() {
    let cards = [];

    if (this.state.deck.cards) {
      cards = this.state.deck.cards.map((card, idx) => <CardItem key={idx} card={card} />);
    }

    return (
      <div className="container">
        <h2 className="center grey-text text-darken-4">{this.state.deck.name}</h2>
        <div className="card-list">
          <section>
            <div className="card-columns">
              {cards}
            </div>
          </section>
        </div>
      </div>
    );
  }
}

Deck.propTypes = {
  params: React.PropTypes.object.isRequired,
};

export default Deck;
