'use strict';

const BaseError = require('./BaseError');

export default class UnauthorizedError extends BaseError {
    constructor(message = null) {
        super(401, message, 'UnauthorizedError');
        this.message = message;
        this.code = 401;
        this.status = 401;
    }
}
