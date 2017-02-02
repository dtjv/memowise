/* global Materialize */

export const handleError = ({ error } = {}) => {
  if (error.message) {
    Materialize.toast(error.message, 5000);
  } else {
    Materialize.toast(JSON.stringify(error), 5000);
  }
};

export const isError = obj => (obj && obj.error);
