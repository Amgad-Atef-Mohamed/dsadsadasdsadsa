'use strict'

import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as express from 'express'
import * as helmet from 'helmet'
import * as http from 'http'
import router from './router'

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
    this.app.use(cors())

    /** Register application router */
    this.app.use('/', router)
  }

  private listenForExceptions(): void {
    process.on('unhandledRejection', (reason: string, p: Promise<any>) => {
      throw reason
    })

    process.on('uncaughtException', (error: Error) => {
      process.exit(1)
    })
  }
}
