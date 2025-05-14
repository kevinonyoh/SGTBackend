import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheStoreService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async set(key: string, value: any, ttl: number = 0, prefix?: string) {
        try {
            if (prefix) key = `${prefix}-${key}`;
            
            await this.cacheManager.set(key, value, ttl );

        } catch (err) {
            throw new Error(err);
        }
    }

    async get(key: string, prefix?: string): Promise<any> {
        try {
            if (prefix) key = `${prefix}-${key}`;

            return await this.cacheManager.get(key);
        } catch (err) {
            throw new Error(err);
        }
    }

    async del(key: string, prefix?: string) {
        try {
            if (prefix) key = `${prefix}-${key}`;
            
            return await this.cacheManager.del(key);
        } catch (err) {
            throw new Error(err);
        }
    }
}
