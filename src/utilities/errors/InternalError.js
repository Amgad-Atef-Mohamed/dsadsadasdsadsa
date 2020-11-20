'use strict';

const BaseError = require('./BaseError');

export default class InternalError extends BaseError {
    constructor(message) {
        super('internal_error', 500, message, 'InternalError');
    }
}
