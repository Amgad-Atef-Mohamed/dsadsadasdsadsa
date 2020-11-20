'use strict'

const awilix = require('awilix')

import AuthenticationController from './controllers/AuthenticationController'

import AuthenticationService from './services/AuthenticationService'
import CacheBasedOnRedisService from './services/CacheBasedOnRedisService'
import errorManagementService from './services/errorManagementService'
import MailingBasedOnNodeMailerService from './services/MailingBasedOnNodeMailerService'

import * as userRepository from './repositories/userRepository'

// Create the container and set the injectionMode to PROXY (which is also the default).
const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
})

container.register({
    AuthenticationController: awilix.asClass(AuthenticationController).singleton(),
})

container.register({
    authenticationService: awilix.asClass(AuthenticationService).singleton(),
    CacheAdapter: awilix.asClass(CacheBasedOnRedisService).singleton(),
    errorManagementService: awilix.asClass(errorManagementService).singleton(),
    mailingAdapter: awilix.asClass(MailingBasedOnNodeMailerService).singleton(),
})

container.register({
    userRepository: awilix.asClass(userRepository).singleton(),
})

container.loadModules([
    [
        'src/models/**/*.js', {
            lifetime: awilix.Lifetime.TRANSIENT,
            register: awilix.asValue,
    },
    ],
], {
    formatName: name => name,
})

module.exports = container
