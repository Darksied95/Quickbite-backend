import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Request } from "express";
import { SlidingWindowRateLimiter } from "../sliding-window-rate-limiter";

@Injectable()
export class SlidingWindowGuard implements CanActivate {

    constructor(
        private readonly rateLimiter: SlidingWindowRateLimiter
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<Request>()
        const key = req.user ? `rate:user:${req.user.userId}` : `rate:ip:${req.ip}`;


        const allowed = await this.rateLimiter.isAllowed(key, 100, 60000)

        if (!allowed) {
            throw new HttpException('Too Many Requests', HttpStatus.TOO_MANY_REQUESTS)
        }

        return true
    }

}