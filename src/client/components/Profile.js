import React, { PropTypes } from 'react';
import moment from 'moment';

const Profile = ({ user }) => {
  if (!user) return null;
  return (
    <div className="container">
      <h4 className="center grey-text text-darken-4"> User Profile </h4>
      <h5>{user.name}</h5>
      <div>{user.email}</div>
      <div>Member Since: {moment(user.createdAt).calendar()}</div>
      <div><small className="grey-text">{user._id}</small></div>
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
};

export default Profile;
