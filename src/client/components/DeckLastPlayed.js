import React, { PropTypes } from 'react';
import moment from 'moment';

const DeckLastPlayed = ({ date }) => (
  <h6 className="center">Last Studied: {(date && moment(date).calendar()) || 'Never'}</h6>
);


DeckLastPlayed.propTypes = {
  date: PropTypes.string,
};

export default DeckLastPlayed;
