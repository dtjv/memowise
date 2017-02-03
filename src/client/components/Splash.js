/* eslint-disable max-len */

import React from 'react';
import { Link } from 'react-router';

const Splash = () => (
  <div className="container">
    <br />
    <h1 className="center splashtitle"> MemoWise </h1>
    <div className="row" />
    <div className="row center">
      <div className="col s4">
        <h5 className="splashsubtitle"> A Responsive UI </h5>
        <p className="splashpara">
          Whether you study on your computer, tablet or phone, Memowise presents a simple and intuitive UI for maximum learing.
        </p>
      </div>
      <div className="col s4">
        <h5 className="splashsubtitle"> Track Your Progress </h5>
        <p className="splashpara"> Memowise displays a visual progress bar for each deck of cards you study - A great way to track progess.</p>
      </div>
      <div className="col s4">
        <h5 className="splashsubtitle"> Import Flashcards </h5>
        <p className="splashpara">
          Write your own flashcards in markdown and easily import an entire deck of cards using our simple command line tool.
        </p>
      </div>
    </div>
    <div className="row center">
      <Link to="/dashboard" className="btn-large blue splashsubtitle">
        Study Now!
      </Link>
    </div>
  </div>
);

export default Splash;

