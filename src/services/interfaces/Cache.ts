'use strict'

export interface Cache {
    adapter: object

    searchByPattern(pattern: string): Promise<string[]>

    set(cacheKey: string, value:string, TTL: number): Promise<void>
}

export default Cache
