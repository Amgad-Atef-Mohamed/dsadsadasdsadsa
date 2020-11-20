'use strict';

const BaseError = require('./BaseError');

export default class ForbiddenError extends BaseError {
    constructor(key, message) {
        super(key, 403, message, 'ForbiddenError');
        this.key = key;
        this.message = message;
        this.code = 403;
        this.status = 403;
    }
}
