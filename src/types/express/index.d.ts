import { Request } from "express";
import { JWTPayload } from "src/modules/auth/token/token.type";

declare global {
    namespace Express {
        interface Request {
            user?: JWTPayload;
            restaurant?: IRestaurant
        }
    }
}

export { }