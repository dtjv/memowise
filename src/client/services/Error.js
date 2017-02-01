/* global Materialize */

export default class Error {
  static handleError({ error } = {}) {
    if (error.message) {
      Materialize.toast(error.message, 5000);
    } else {
      Materialize.toast(JSON.stringify(error), 5000);
    }
  }

  static isError(obj) {
    return obj && obj.error;
  }
}
