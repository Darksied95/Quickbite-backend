import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { CurrentUser } from "src/common/decorators/user.decorator";
import { JWTPayload } from "../auth/token/token.type";
import { ReviewService } from "./reviews.service";
import { CreateReviewDto } from "./dtos/create-review.dto";

@Controller('reviews')
@UseGuards(AuthGuard)
export class ReviewController {
    constructor(
        private readonly reviewService: ReviewService
    ) { }

    @Post(":orderId")
    create(
        @Param("orderId", ParseUUIDPipe) orderId: string,
        @CurrentUser() user: JWTPayload,
        @Body() body: CreateReviewDto
    ) {
        return this.reviewService.create(body, orderId, user.userId)
    }

    @Get(":restaurantId")
    get(
        @Param("restaurantId", ParseUUIDPipe) restaurantId: string,
    ) {
        return this.reviewService.get(restaurantId)
    }
}