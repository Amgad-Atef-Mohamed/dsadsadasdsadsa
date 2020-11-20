import * as config from 'config'
import {Mongoose} from 'mongoose'
import * as mongoose from 'mongoose'

/**
 * @class Database
 */
export default class Database {

  private readonly name: string
  private readonly host: string
  private readonly port: number
  private readonly user: string
  private readonly pass: string

  /**
   * Constructor.
   *
   * @class Database
   * @constructor
   * @public
   *
   */
  public constructor() {
    this.name = config.get('database.name')
    this.host = config.get('database.host')
    this.port = config.get('database.port')
    this.user = config.get('database.user')
    this.pass = config.get('database.pw')
  }

  /**
   * Connect to MongoDB.
   *
   * @class Database
   * @method connect
   * @public
   *
   * @return {Promise<Mongoose>}
   */
  public connect(): Promise<Mongoose> {
    const uri: string = `mongodb://${this.host}:${this.port}/${this.name}`
    const options: object = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: 5, // Can now run 5 operations at a time
      autoIndex: config.get('mongoose.autoIndex'),
      useCreateIndex: true,
      useFindAndModify: false,
      family: 4, // connect using IPv4
      user: this.user,
      pass: this.pass,
      promiseLibrary: global.Promise,
    }

    mongoose.set('debug', config.get('mongoose.debug'))

    return mongoose.connect(uri, options)
  }
}
