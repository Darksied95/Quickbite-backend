import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JWTPayload } from 'src/modules/auth/token/token.type';

export const CurrentUser = createParamDecorator(
    (data: keyof JWTPayload, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<Request>();
        const user = request.user;

        if (!user) {
            return null;
        }

        if (data) {
            return user[data];
        }
        return user;
    },
);