'use strict'

import * as chalk from 'chalk'
import * as config from 'config'
import Database from './Database'
import Server from './Server'

const db: Database = new Database()
const server: Server = Server.bootstrap();

(async () => {
    try {
        await db.connect()
        console.log(chalk.green('[DATABASE] Connected.'))

        await server.startHttpServer(config.get('port'))
        console.log(chalk.green(`[SERVER] Started on ${chalk.cyan(`http://localhost:${config.get('port')}`)}`))
    } catch (err) {
        console.error(chalk.red('Error.'), err)
    }
})()
