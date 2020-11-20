'use strict'

const awilix = require('awilix')

import AuthenticationController from './controllers/AuthenticationController'
import ChatController from './controllers/ChatController'

import AuthenticationService from './services/AuthenticationService'
import CacheBasedOnRedisService from './services/CacheBasedOnRedisService'
import errorManagementService from './services/errorManagementService'
import MailingBasedOnNodeMailerService from './services/MailingBasedOnNodeMailerService'
import chatMessagesService from './services/chatMessagesService'
import WebSocketService from './services/WebSocketService'

import * as userRepository from './repositories/userRepository'
import * as messagesRepository from './repositories/messagesRepository'

// Create the container and set the injectionMode to PROXY (which is also the default).
const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
})

container.register({
    AuthenticationController: awilix.asClass(AuthenticationController).singleton(),
    ChatController: awilix.asClass(ChatController).singleton(),
})

container.register({
    authenticationService: awilix.asClass(AuthenticationService).singleton(),
    CacheAdapter: awilix.asClass(CacheBasedOnRedisService).singleton(),
    errorManagementService: awilix.asClass(errorManagementService).singleton(),
    mailingAdapter: awilix.asClass(MailingBasedOnNodeMailerService).singleton(),
    RealTimeCommunicationAdapter: awilix.asClass(WebSocketService).singleton(),
    ChatMessagesService: awilix.asClass(chatMessagesService).singleton(),
})

container.register({
    userRepository: awilix.asClass(userRepository).singleton(),
    messagesRepository: awilix.asClass(messagesRepository).singleton(),
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
