import React from 'react';

const AuthBar = ({ user }) => {
  const name = user ? user.name : '';

  return (
    <span>{name || <a href="/signin">Sign In</a>}</span>
  );
};

AuthBar.propTypes = {
  user: React.PropTypes.object,
};

export default AuthBar;
