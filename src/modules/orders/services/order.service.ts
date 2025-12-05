import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { DRIZZLE, DrizzleDb } from "src/database/drizzle.module";
import { orders } from "../schemas/orders.schema";
import { eq, sql } from "drizzle-orm";
import { PinoLogger } from "nestjs-pino";
import { CreateOrderDto } from "../dto/create-order.dto";
import { AddressService } from "../../addresses/addresses.service";
import { orderItems, menuItems as menuItemsSchema } from "src/database/drizzle.schema";
import { OrderValidator } from "./order-validator.service";
import { OrderFactory } from "./order-factory.service";
import { IOrderStatus } from "../order.constant";

@Injectable()
export class OrderService {
    constructor(
        @Inject(DRIZZLE) private readonly db: DrizzleDb,
        private readonly addressService: AddressService,
        private readonly logger: PinoLogger,
        private readonly orderValidator: OrderValidator,
        private readonly orderFactory: OrderFactory
    ) {
        this.logger.setContext(OrderService.name)
    }

    async create(userId: string, body: CreateOrderDto) {

        await this.addressService.validateAddressOwnership(body.address_id, userId)

        return await this.db.transaction(async trx => {

            const context = await this.orderValidator.getValidatedOrderContext(trx, body.orders)

            const { initialOrder, orderItemsData } = this.orderFactory.buildOrderData({
                userId,
                addressId: body.address_id,
                context,
                orderItems: body.orders
            })

            const [order] = await trx.insert(orders).values(initialOrder).returning()

            const finalOrderItemsData = orderItemsData.map(item => ({
                ...item,
                order_id: order.id
            }))

            await trx.insert(orderItems).values(finalOrderItemsData)

            await Promise.all(
                body.orders.map(o =>
                    trx
                        .update(menuItemsSchema)
                        .set({ stock: sql`stock - ${o.quantity}` })
                        .where(eq(menuItemsSchema.id, o.menu_item_id))
                )
            )

            return order
        })
    }

    async getAllForRestaurant(restaurant_id: string) {
        return this.db.select().from(orders).where(eq(orders.restaurant_id, restaurant_id));
    }

    async getAllForCustomer(customer_id: string) {
        return this.db.select().from(orders).where(eq(orders.customer_id, customer_id));
    }

    async acceptOrder(order_id: string) {
        return this.transitionOrderStatus(order_id, ['pending'], 'accepted')
    }

    async readyForPickup(order_id: string) {
        return this.transitionOrderStatus(order_id, ['accepted'], 'ready_for_pickup')
    }

    async rejectOrder(order_id: string) {
        return this.transitionOrderStatus(order_id, ['pending', 'accepted', 'ready_for_pickup'], 'restaurant_rejected')
    }

    private transitionOrderStatus(order_id: string, fromStatus: IOrderStatus[], toStatus: IOrderStatus, errorMessage?: string) {
        return this.db.transaction(async (trx) => {
            const [order] = await trx
                .select()
                .from(orders)
                .where(eq(orders.id, order_id))
                .for('update')

            if (!order) throw new NotFoundException('Order not found');

            if (!fromStatus.includes(order.status)) {
                throw new BadRequestException(errorMessage ?? `Cannot transition order with status: ${order.status} to ${toStatus}`);
            }

            const [updated] = await trx.update(orders).set({ status: toStatus }).where(eq(orders.id, order_id)).returning()

            return updated
        })
    }
}