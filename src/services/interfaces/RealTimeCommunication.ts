'use strict'

export interface RealTimeCommunication {
    adapter: object

    connect(httpsServer: object): void

    subscribeToNewConnections(): void

    broadcastNewMessage(message: object): void
}

export default RealTimeCommunication
