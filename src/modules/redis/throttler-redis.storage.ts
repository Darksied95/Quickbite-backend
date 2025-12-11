import { ThrottlerStorage } from "@nestjs/throttler";
import { Inject, Injectable } from "@nestjs/common";
import Redis from 'ioredis';
import { REDIS_CLIENT } from "./redis.module";
import { ThrottlerStorageRecord } from "@nestjs/throttler/dist/throttler-storage-record.interface";

@Injectable()
export class ThrottlerRedisStorage implements ThrottlerStorage {
    constructor(
        @Inject(REDIS_CLIENT) private readonly redis: Redis
    ) { }

    async increment(key: string, ttl: number): Promise<ThrottlerStorageRecord> {
        const result = await this
            .redis
            .multi()
            .incr(key)
            .pttl(key)
            .exec()

        if (!result) {
            throw new Error('Redis transaction failed');
        }

        const [[incrErr, totalHits], [ttlErr, timeToExpire]] = result

        if (incrErr || ttlErr) {
            throw new Error('Redis command failed.')
        }

        if (totalHits === 1) {
            await this.redis.pexpire(key, ttl)
        }

        return {
            totalHits: totalHits as number,
            timeToExpire: timeToExpire === -1 ? ttl : (timeToExpire) as number,
            isBlocked: false,
            timeToBlockExpire: 0
        }
    }

}