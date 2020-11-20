'use strict';

const BaseError = require('./BaseError');

class ValidationError extends BaseError {
    constructor(errors) {
        super('invalid_input', 400, 'Invalid input', 'ValidationError');

        this.errors = Array.isArray(errors) ? errors : [errors];
        this.message = 'Please check the following errors';
    }

    toResponse() {
        return {
            errors: this.errors,
        };
    }

    static withTranslate(key, param, value) {
        return new ValidationError({
            msg: key,
            param,
            value,
            needTranslate: true,
        });
    }
}

module.exports = ValidationError;
module.exports.ValidationErrorTranslatable = ValidationError.withTranslate;
