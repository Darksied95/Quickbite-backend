import { Injectable } from "@nestjs/common";
import { ThrottlerGuard } from "@nestjs/throttler";
import { Request } from "express";

@Injectable()
export class UserThrottlerGuard extends ThrottlerGuard {
    protected async getTracker(req: Request): Promise<string> {
        if (req.user?.userId) {
            return `user:${req.user.userId}`
        }

        return req.ip || req.ips?.[0] || "unknown"
    }
}