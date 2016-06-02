import React from 'react';

const AuthBar = (props) => {
  const user = props.user.user;
  const name = user ? user.name : '';

  return (
    <span>{name || <a href="/login">Login</a>}</span>
  );
};

AuthBar.propTypes = {
  user: React.PropTypes.object,
};

export default AuthBar;
