import { Expose } from "class-transformer";

export class TokenDTO {
    @Expose()
    access: string

    @Expose()
    refresh: string
}