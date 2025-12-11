import { Inject, Injectable } from "@nestjs/common";
import { REDIS_CLIENT } from "./redis.module";
import Redis from "ioredis";


@Injectable()
export class SlidingWindowRateLimiter {
    constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) { }

    async isAllowed(
        key: string,
        limit: number,
        windowMs: number
    ): Promise<boolean> {

        const now = Date.now();
        const windowStart = now - windowMs
        const requestId = `${now}-${Math.random()}`

        const pipeline = this.redis.pipeline();

        pipeline.zremrangebyscore(key, 0, windowStart)

        pipeline.zadd(key, now, requestId)

        pipeline.zcard(key)

        pipeline.pexpire(key, windowMs)

        const results = await pipeline.exec()

        if (!results) {
            throw new Error('Redis pipeline failed')
        }

        const count = results[2][1] as number

        if (count > limit) {
            await this.redis.zrem(key, requestId)
            return false
        }
        return true
    }
}