import { CanActivate, ExecutionContext, UnauthorizedException, BadRequestException, NotFoundException, ForbiddenException, Inject } from "@nestjs/common";
import { isUUID } from "class-validator";
import { eq } from "drizzle-orm";
import { orders } from "./schemas/orders.schema";
import { DRIZZLE, DrizzleDb } from "src/database/drizzle.module";
import { restaurantProfiles } from "src/database/drizzle.schema";

export class OrderRestaurantOwnerGuard implements CanActivate {
    constructor(
        @Inject(DRIZZLE) private readonly db: DrizzleDb
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const order_id = request.params.orderId;

        if (!user) throw new UnauthorizedException('Authentication required');

        if (!order_id || !isUUID(order_id)) {
            throw new BadRequestException('Invalid order ID');
        }

        const [order] = await this.db
            .select({
                id: orders.id,
                restaurant_id: orders.restaurant_id
            })
            .from(orders)
            .where(eq(orders.id, order_id));

        if (!order) throw new NotFoundException('Order not found');

        const [restaurant] = await this.db
            .select({ owner_id: restaurantProfiles.owner_id })
            .from(restaurantProfiles)
            .where(eq(restaurantProfiles.id, order.restaurant_id));

        if (!restaurant) throw new NotFoundException('Restaurant not found');

        if (user.role === 'admin') {
            return true;
        }

        if (restaurant.owner_id !== user.userId) {
            throw new ForbiddenException('This order belongs to a restaurant you do not own');
        }

        return true;
    }
}