'use strict'

export interface Cache {
    adapter: object

    searchByPattern(pattern: string): Promise<string[]>

    getByPattern(pattern: string): Promise<string>

    set(cacheKey: string, value:string, TTL: number): Promise<void>

    delByPattern(patterns: string[] | string): Promise<number>
}

export default Cache
