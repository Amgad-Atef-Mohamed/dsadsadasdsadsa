'use strict'

import Message from './../../models/interfaces/message'

export interface MessagesRepository {
  saveTheNewMessage(message: string, name: string): Promise<Message>

  getTheLastTenMessages(): Promise<Message[]>
}

export default MessagesRepository
