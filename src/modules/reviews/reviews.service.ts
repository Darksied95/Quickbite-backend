import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateReviewDto } from "./dtos/create-review.dto";
import { DRIZZLE, DrizzleDb } from "src/database/drizzle.module";
import { orders, restaurantProfiles, reviews } from "src/database/drizzle.schema";
import { and, eq, sql, desc } from "drizzle-orm";

@Injectable()
export class ReviewService {
    constructor(
        @Inject(DRIZZLE) private readonly db: DrizzleDb
    ) { }
    async create(data: CreateReviewDto, order_id: string, user_id: string) {

        return this.db.transaction(async trx => {

            const [order] = await trx
                .select()
                .from(orders)
                .where(and(
                    eq(orders.id, order_id),
                    eq(orders.customer_id, user_id)
                ))
                .for("update")

            if (!order) {
                throw new NotFoundException('Order not found')
            }

            if (order.status !== "delivered") {
                throw new BadRequestException("Cannot review an order that isn't delivered")
            }

            const [existingReview] = await trx.select().from(reviews).where(eq(reviews.order_id, order_id))

            if (existingReview) {
                throw new BadRequestException('Order already reviewed')
            }

            await trx
                .update(restaurantProfiles)
                .set({
                    total_reviews: sql`${restaurantProfiles.total_reviews} + 1`,
                    average_rating: sql` 
                    (COALESCE(${restaurantProfiles.average_rating}, 0) * ${restaurantProfiles.total_reviews} + ${data.rating}) 
                    / (${restaurantProfiles.total_reviews} + 1)`

                })
                .where(eq(restaurantProfiles.id, order.restaurant_id))

            const [review] = await trx
                .insert(reviews)
                .values({
                    customer_id: user_id,
                    order_id,
                    restaurant_id: order.restaurant_id,
                    restaurant_rating: data.rating,
                    comment: data.comment
                })
                .returning()

            return review
        })

    }

    async get(restaurant_id: string) {
        return await this.db
            .select()
            .from(reviews)
            .where(eq(reviews.restaurant_id, restaurant_id))
            .orderBy(desc(reviews.created_at))
    }
}