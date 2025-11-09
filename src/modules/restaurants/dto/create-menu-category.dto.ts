import { PartialType } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class MenuCategoryDTO {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsBoolean()
    @IsOptional()
    is_active?: boolean = true
}

export class UpdateMenuCategoryDTO extends PartialType(MenuCategoryDTO) { }