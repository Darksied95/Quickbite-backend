import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { DeliveryService } from "./delivery.service";
import { Request } from "express";

@Controller("deliveries")
@UseGuards(AuthGuard)
export class DeliveryController {
    constructor(
        private deliveryService: DeliveryService
    ) { }


    @Patch(':orderId/accept')
    @HttpCode(HttpStatus.NO_CONTENT)
    acceptDelivery(
        @Req() req: Request,
        @Param('orderId', ParseUUIDPipe) orderId: string
    ) {
        return this.deliveryService.acceptDelivery(orderId, req.user?.userId!)
    }

    @Patch(':orderId/pickup')
    @HttpCode(HttpStatus.NO_CONTENT)
    pickDelivery(
        @Req() req: Request,
        @Param('orderId', ParseUUIDPipe) orderId: string
    ) {
        return this.deliveryService.pickupDelivery(orderId, req.user?.userId!)
    }

    @Patch(':orderId/deliver')
    @HttpCode(HttpStatus.NO_CONTENT)
    deliverDelivery(
        @Req() req: Request,
        @Param('orderId', ParseUUIDPipe) orderId: string
    ) {
        return this.deliveryService.deliver(orderId, req.user?.userId!)
    }

    @Patch(':orderId/cancel')
    @HttpCode(HttpStatus.NO_CONTENT)
    cancelDelivery(
        @Req() req: Request,
        @Param('orderId', ParseUUIDPipe) orderId: string,
        @Body() body: { reason: string }
    ) {
        if (!body.reason || body.reason.trim().length < 10) {
            throw new BadRequestException('Cancellation reason must be at least 10 characters');
        }
        return this.deliveryService.cancelDelivery(orderId, req.user?.userId!, body.reason)
    }



}