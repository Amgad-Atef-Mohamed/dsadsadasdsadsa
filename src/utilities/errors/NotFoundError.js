'use strict';

const BaseError = require('./BaseError');

/**
 * @class NotFoundError
 */
export default class NotFoundError extends BaseError {
    constructor(key, message = null) {
        super('', 404, null, 'NotFoundError');
        this.key = `${key}_not_found`;
        this.message = message || (`${key} not found`);
        this.code = 404;
        this.status = 404;
    }
}
