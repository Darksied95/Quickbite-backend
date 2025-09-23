import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { UserNotFoundException } from "./user-not-found.exception";
import { Request, Response } from "express";


@Catch(UserNotFoundException)
export class DomainExceptionFilter implements ExceptionFilter {
    catch(exception: UserNotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()

        let statusCode = HttpStatus.NOT_FOUND
        let message = exception.message

        if (request.url.includes("/auth/login")) {
            statusCode = HttpStatus.UNAUTHORIZED
            message = 'Invalid credentials.'
        }

        response.status(statusCode).json({
            message,
            timestamp: new Date().toISOString(),
            path: request.url,
            statusCode
        })
    }
}