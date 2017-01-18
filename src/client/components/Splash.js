import React from 'react';
import { Link } from 'react-router';

const Splash = () => (
  <div className="container">
    <br />
    <h1 className="center splashtitle"> MEMOWISE </h1>
    <div className="row" />
    <div className="row center">
      <div className="col s4">
        <h6 className="splashsubtitle"> select a deck </h6>
        <p className="splashpara"> you think you know your sublime text keyboard
        shortcuts? think again. test yourself with a deck of cards based on it</p>
      </div>
      <div className="col s4">
        <h6 className="splashsubtitle"> flip it </h6>
        <p className="splashpara"> think about the question. check the answer by flipping
        the card</p>
      </div>
      <div className="col s4">
        <h6 className="splashsubtitle"> rate yourself </h6>
        <p className="splashpara"> the frequency a card appears will be based on your
        rating. </p>
      </div>
    </div>
    <div className="row center">
      <Link to="/dashboard" className="btn-large cyan lighten-3 splashsubtitle">
      memowise it now!</Link>
    </div>
  </div>
);

export default Splash;

