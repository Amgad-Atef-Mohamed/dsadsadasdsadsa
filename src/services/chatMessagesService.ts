'use strict'

const xss = require('xss')
import MessagesRepository from './../repositories/interfaces/MessagesRepository'
import Cache from './../services/interfaces/Cache'
import RealTimeCommunication from './../services/interfaces/RealTimeCommunication'

export default class ChatMessagesService {
    private messagesRepository: MessagesRepository
    private CacheAdapter: Cache
    private RealTimeCommunicationAdapter: RealTimeCommunication
    /**
     * @param {Object} opts
     * @param {messagesRepository} opts.messagesRepository
     * @param {CacheAdapter} opts.Cache
     * @param {RealTimeCommunicationAdapter} opts.RealTimeCommunicationAdapter
     */
    constructor(opts) {
        this.messagesRepository = opts.messagesRepository
        this.CacheAdapter = opts.CacheAdapter
        this.RealTimeCommunicationAdapter = opts.RealTimeCommunicationAdapter
    }

    public async listTheLastTenMessages(): Promise<object[]> {
       return this.messagesRepository.getTheLastTenMessages()
    }

    public async saveMessageAndBroadCast(payload): Promise<void> {
        const { name, message } = payload

        const savedMessage = await this.messagesRepository.saveTheNewMessage(xss(message), name)

        return this.RealTimeCommunicationAdapter.broadcastNewMessage(savedMessage)
    }
}
