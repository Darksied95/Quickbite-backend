import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { and, eq, sql } from "drizzle-orm";
import { DRIZZLE, DrizzleDb } from "src/database/drizzle.module";
import { driverProfiles, orders } from "src/database/drizzle.schema";
import { driverAssignments } from "./schemas/driver_assignments.schema";

@Injectable()

export class DeliveryService {
    constructor(
        @Inject(DRIZZLE) private readonly db: DrizzleDb,
    ) {
    }

    async acceptDelivery(order_id: string, user_id: string) {
        return this.db.transaction(async trx => {
            const [order] = await trx
                .select()
                .from(orders)
                .where(eq(orders.id, order_id))
                .for("update")

            if (!order) throw new NotFoundException('Order not Found')

            if (order.status !== "ready_for_pickup") {
                throw new BadRequestException(`Cannot accept order that is not ready for pickup, current status is ${order.status}`)
            }

            const [existingAssignment] = await trx
                .select()
                .from(driverAssignments)
                .where(and(
                    eq(driverAssignments.order_id, order_id),
                    eq(driverAssignments.status, "assigned")
                ))

            if (existingAssignment) {
                throw new BadRequestException(`Order already assigned to another driver`)
            }

            const [assignment] = await trx
                .insert(driverAssignments)
                .values({
                    driver_id: user_id,
                    order_id,
                })
                .returning()

            return assignment
        })
    }

    async pickupDelivery(order_id: string, user_id: string) {
        return this.db.transaction(async trx => {
            const [assignment] = await trx
                .update(driverAssignments)
                .set({
                    status: "picked_up",
                    picked_up_at: new Date()
                })
                .where(and(
                    eq(driverAssignments.order_id, order_id),
                    eq(driverAssignments.status, "assigned"),
                    eq(driverAssignments.driver_id, user_id)
                ))
                .returning()

            if (!assignment) {
                throw new BadRequestException(`No order assignment available for pickup`)
            }

            const [order] = await trx
                .update(orders)
                .set({ status: "picked_up" })
                .where(and(
                    eq(orders.id, order_id),
                    eq(orders.status, "ready_for_pickup")
                ))
                .returning()

            if (!order) {
                throw new BadRequestException('Order not ready')
            }

        })
    }

    async deliver(order_id: string, user_id: string) {
        return this.db.transaction(async trx => {

            const a = await trx.select().from(driverAssignments).where(and(
                eq(driverAssignments.driver_id, user_id),
                eq(driverAssignments.order_id, order_id),
                eq(driverAssignments.status, "picked_up")
            ))

            console.log(a, order_id, user_id);


            const [assignment] = await trx
                .update(driverAssignments)
                .set({
                    status: "delivered",
                    delivered_at: new Date()
                })
                .where(and(
                    eq(driverAssignments.driver_id, user_id),
                    eq(driverAssignments.order_id, order_id),
                    eq(driverAssignments.status, "picked_up")
                ))
                .returning()

            console.log(assignment);

            if (!assignment) {
                throw new BadRequestException('No assignment found')
            }

            const [order] = await trx
                .update(orders)
                .set({ status: "delivered" })
                .where(and(
                    eq(orders.id, order_id),
                    eq(orders.status, "picked_up")
                ))
                .returning()

            if (!order) {
                throw new BadRequestException('Order is not in picked_up state')
            }

            await trx
                .update(driverProfiles)
                .set({ total_rides: sql`${driverProfiles.total_rides} + 1` })
                .where(eq(driverProfiles.user_id, user_id))

        })


    }

    async cancelDelivery(order_id: string, user_id: string, reason: string) {
        return this.db.transaction(async trx => {
            const [assignment] = await trx
                .update(driverAssignments)
                .set({ cancelled_at: new Date(), status: "cancelled", cancellation_reason: reason })
                .where(and(
                    eq(driverAssignments.driver_id, user_id),
                    eq(driverAssignments.order_id, order_id),
                    eq(driverAssignments.status, "assigned")
                ))
                .returning()

            if (!assignment) {
                throw new BadRequestException('No active assignment found or order already picked up')
            }



        })
    }
}