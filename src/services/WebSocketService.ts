'use strict';

import * as config from 'config'
import { RedisClient } from 'redis'
import { Server } from 'socket.io'
import { createAdapter } from 'socket.io-redis'
import RealTimeCommunication from './../services/interfaces/RealTimeCommunication'

class WebSocketService implements RealTimeCommunication {
  adapter: Server

  public connect(httpsServer) {
    const adapter = new Server(httpsServer, {
      cors: {
        origin: 'http://127.0.0.1:8000',
        credentials: true,
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'],
      },
    })
    const pubClient = new RedisClient({
        auth_pass: config.get('redis.password'),
        host: config.get('redis.host'),
        port: config.get('redis.port'),
    })
    const subClient = pubClient.duplicate();

    adapter.adapter(createAdapter({ pubClient, subClient }))
    this.adapter = adapter
  }

  public subscribeToNewConnections() {
    this.adapter.on('connection', (socket) => {
      console.log('connection')
      socket.on('disconnect', () => {
        console.log('disconnect')
      })
    })
  }

  public broadcastNewMessage(message) {
    this.adapter.emit('newMessage', message)
  }
}

export default WebSocketService
