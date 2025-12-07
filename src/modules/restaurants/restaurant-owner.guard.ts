import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { RestaurantRepository } from './repositories/restaurant.repository';
import { isUUID } from 'class-validator';

@Injectable()
export class RestaurantOwnerGuard implements CanActivate {
  constructor(private readonly restaurantRepository: RestaurantRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const restaurant_id = request.params.restaurantId || request.params.id;
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('Authentication required.');
    }

    if (user.role !== 'restaurant_owner' && user.role !== 'admin') {
      throw new ForbiddenException(
        'You are not authorized to manage restaurants.',
      );
    }

    if (!restaurant_id || !isUUID(restaurant_id)) {
      throw new BadRequestException('Invalid restaurant Id');
    }
    const restaurant = await this.restaurantRepository.findById(restaurant_id);

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }
    if (user.role === 'admin') {
      return true;
    }

    if (restaurant.owner_id !== user.userId) {
      throw new ForbiddenException('You do not own this restaurant.');
    }

    return true;
  }
}
