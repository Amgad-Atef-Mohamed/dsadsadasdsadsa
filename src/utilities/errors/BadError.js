'use strict';

const BaseError = require('./BaseError');

export default class BadError extends BaseError {
  constructor(message) {
    super(400, message, 'BadError');
    this.message = message;
    this.code = 400;
    this.status = 400;
  }
}
