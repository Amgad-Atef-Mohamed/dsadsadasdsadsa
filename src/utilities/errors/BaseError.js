'use strict';

module.exports =  class BaseError extends Error {
    constructor(code, defaultMessage, errName = 'BaseError') {
        super();
        this.message = defaultMessage;
        this.code = code;
        this.status = code;
        this.name = `${errName}: ${typeof this.key}` !== 'string' && Array.isArray(this.key) ? this.key[0] : this.key;
    }
}
