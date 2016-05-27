import React from 'react';
import DeckItem from './DeckItem';
import $ from 'jquery';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      decks: [],
    };
    this.getDecks = this.getDecks.bind(this);
  }

  componentDidMount() {
    this.getDecks();
  }

  getDecks() {
    $.getJSON('/api/decks').done((decks) => {
      this.setState({ decks });
    });
  }

  render() {
    return (
      <div className="container">
        <section id="cards">
          <h4 className="center grey-text text-darken-4 " > Decks </h4>
          <div className="card-list">
            <section>
              <div className="card-columns">
                {this.state.decks.map((deck, idx) => <DeckItem key={idx} id={idx} deck={deck} />)}
              </div>
            </section>
          </div>
        </section>
      </div>
    );
  }
}

export default Dashboard;
