import React from 'react';

const CardItem = ({ card }) => (
  <div className="card-item">
    <div className="card-panel hoverable">
      <div className="card-content">
        <div className="card-title grey-text text-darken-4 center">
          <strong>{card.question.text}</strong>
        </div>
      </div>
    </div>
  </div>
);

CardItem.propTypes = {
  card: React.PropTypes.object.isRequired,
};

export default CardItem;
