import { IsOptional, IsUUID } from "class-validator";

export class GetMenuItem {
    @IsUUID()
    @IsOptional()
    category_id?: string
}