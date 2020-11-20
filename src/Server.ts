'use strict'

import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as express from 'express'
import * as helmet from 'helmet'
import * as http from 'http'
import * as config from 'config'
import router from './router'

const cookieParser = require('cookie-parser')
const  IoCContainer = require('./IoCContainer')

/**
 * @class Server
 */
export default class Server {

  /**
   * Return a new instance of Server
   *
   * @class Server
   * @method bootstrap
   * @static
   *
   * @return {Server}
   */
  public static bootstrap(): Server {
    return new Server()
  }

  private readonly app: express.Application

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   * @public
   */
  public constructor() {
    this.app = express()
    this.config()
    this.listenForExceptions()
  }

  /**
   * Run the server.
   *
   * @class Server
   * @method startHttpServer
   * @public
   *
   * @param {number} port
   *
   * @return {http.Server}
   */
  public startHttpServer(port: number) {
    const httpsServer = http.createServer(this.app)
    const realTimeAdapter = IoCContainer.resolve('RealTimeCommunicationAdapter')
    realTimeAdapter.connect(httpsServer)
    realTimeAdapter.subscribeToNewConnections()

    return httpsServer.listen(port)
  }

  /**
   * Initialize server config.
   *
   * @class Server
   * @method config
   * @private
   *
   * @return {Void}
   */
  private config(): void {
    /** Register lib middlewares */
    // Delegated (gzip, SSL) to the reverse proxy
    // Delegated Limit payload size using a reverse-proxy
    this.app.use(helmet())
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(cookieParser())
    this.app.use(cors({
      credentials:  true,
      origin: config.get('frontEndOrigin'),
    }))
    /** Register application router */
    this.app.use('/', router)
  }

  private listenForExceptions(): void {
    process.on('unhandledRejection', (reason: string, p: Promise<any>) => {
      throw reason
    })

    process.on('uncaughtException', (error: Error) => {
      console.log('error', error)
      process.exit(1)
    })
  }
}
