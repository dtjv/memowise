import React from 'react';
import { Link } from 'react-router';

const AuthBar = ({ user, mobile }) => {
  const name = user ? user.name : '';

  // TODO: factor these out
  if (mobile) {
    return (
      <ul id="nav-mobile" className="side-nav">
        <li>
          {
            name ?
              <Link to="/profile">{name}</Link> :
              <Link to="/sign-in">Sign In</Link>
          }
        </li>
        <li>
          {
            name ?
              <Link to="/sign-out">Sign Out</Link> :
              <Link to="/create-account">Create Account</Link>
          }
        </li>
      </ul>
    );
  }

  return (
    <ul className="right hide-on-med-and-down">
      <li>
        {
          name ?
            <Link to="/profile">{name}</Link> :
            <Link to="/sign-in">Sign In</Link>
        }
      </li>
      <li>
        {
          name ?
            <Link to="/sign-out">Sign Out</Link> :
            <Link to="/create-account">Create Account</Link>
        }
      </li>
    </ul>
  );
};

AuthBar.propTypes = {
  user: React.PropTypes.object,
  mobile: React.PropTypes.bool,
};

export default AuthBar;
