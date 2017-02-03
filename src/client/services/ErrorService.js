/* global Materialize */

const delay = 2000;

export const handleError = ({ error } = {}) => {
  if (error.message) {
    Materialize.toast(error.message, delay);
  } else {
    Materialize.toast(JSON.stringify(error), delay);
  }
};

export const isError = obj => (obj && obj.error);
