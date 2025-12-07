import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { DeliveryService } from './delivery.service';
import { Request } from 'express';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { JWTPayload } from '../auth/token/token.type';

@Controller('deliveries')
@UseGuards(AuthGuard)
export class DeliveryController {
  constructor(private deliveryService: DeliveryService) {}

  @Patch(':orderId/accept')
  @HttpCode(HttpStatus.NO_CONTENT)
  acceptDelivery(
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @CurrentUser() user: JWTPayload,
  ) {
    return this.deliveryService.acceptDelivery(orderId, user.userId);
  }

  @Patch(':orderId/pickup')
  @HttpCode(HttpStatus.NO_CONTENT)
  pickDelivery(
    @CurrentUser() user: JWTPayload,
    @Param('orderId', ParseUUIDPipe) orderId: string,
  ) {
    return this.deliveryService.pickupDelivery(orderId, user.userId);
  }

  @Patch(':orderId/deliver')
  @HttpCode(HttpStatus.NO_CONTENT)
  deliverDelivery(
    @CurrentUser() user: JWTPayload,
    @Param('orderId', ParseUUIDPipe) orderId: string,
  ) {
    return this.deliveryService.deliver(orderId, user.userId);
  }

  @Patch(':orderId/cancel')
  @HttpCode(HttpStatus.NO_CONTENT)
  cancelDelivery(
    @CurrentUser() user: JWTPayload,
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @Body() body: { reason: string },
  ) {
    if (!body.reason || body.reason.trim().length < 10) {
      throw new BadRequestException(
        'Cancellation reason must be at least 10 characters',
      );
    }
    return this.deliveryService.cancelDelivery(
      orderId,
      user.userId,
      body.reason,
    );
  }
}
