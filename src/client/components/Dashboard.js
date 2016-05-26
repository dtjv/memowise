import React from 'react';
import DeckItem from './DeckItem';
import _ from 'underscore';

// stub some data
const items = _.range(10).map((num, idx) => {
  const deck = {
    id: idx,
    topic: `Topic-${num}`,
  };
  return (<DeckItem key={idx} deck={deck} />);
});

const Dashboard = () => (
  <div className="container">
    <section id="cards">
      <h4 className="center grey-text text-darken-4 " > Decks </h4>
      <div className="card-list">
        <section>
          <div className="card-columns">
            {items}
          </div>
        </section>
      </div>
    </section>
  </div>
);

export default Dashboard;
