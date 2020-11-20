'use strict'

import * as config from 'config'
import { RedisClient } from 'redis'
import * as  redis from 'redis'
import * as util  from 'util'
import Cache from './../services/interfaces/Cache'

export default class CacheBasedOnRedisService implements Cache {
    adapter: RedisClient

    constructor() {
        this.adapter = new RedisClient({
            auth_pass: config.get('redis.password'),
            host: config.get('redis.host'),
            port: config.get('redis.port'),
        })

        this.adapter.on('error', console.error.bind(null, 'redis'))
        this.adapter.on('ready', () => console.log('Redis ready'))
    }

    public searchByPattern(pattern: string): Promise<string[]> {
      return util.promisify(this.adapter.keys).bind(this.adapter)(pattern)
    }

    public set(cacheKey: string, OTP: string,  TTL: number): Promise<void> {
      return util.promisify(this.adapter.set).bind(this.adapter)(cacheKey, OTP, 'EX', TTL)
    }
}
