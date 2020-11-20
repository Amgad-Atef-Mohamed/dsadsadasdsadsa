'use strict'

const messageModel = require('./../models/messageModel')
import MessagesRepositoryInterface from './interfaces/MessagesRepository'

module.exports = class MessagesRepository implements MessagesRepositoryInterface {
  private messageModel: any

  constructor() {
    this.messageModel = messageModel
  }

  public saveTheNewMessage(message, name) {
    return this.messageModel.create({ message, name })
  }

  public getTheLastTenMessages() {
    return this.messageModel.find().lean().sort({createdAt: -1 }).limit(10)
  }
}
