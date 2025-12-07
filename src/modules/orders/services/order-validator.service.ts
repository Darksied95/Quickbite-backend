import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DrizzleTransaction } from 'src/database/drizzle.module';
import { OrderItemDto } from '../dto/create-order.dto';
import {
  IMenuItem,
  menuItems as menuItemsSchema,
} from 'src/database/drizzle.schema';
import { inArray } from 'drizzle-orm';

@Injectable()
export class OrderValidator {
  async getValidatedOrderContext(
    trx: DrizzleTransaction,
    orderItems: OrderItemDto[],
  ) {
    const menuItemIds = orderItems.map((order) => order.menu_item_id);

    const menuItems = await trx
      .select()
      .from(menuItemsSchema)
      .where(inArray(menuItemsSchema.id, menuItemIds))
      .orderBy(menuItemsSchema.id)
      .for('update');

    const menuItemsMap = new Map(menuItems.map((item) => [item.id, item]));

    const restaurantId = this.validateItems(menuItemIds, menuItems);

    this.checkStock(orderItems, menuItemsMap);

    return { menuItemsMap, restaurantId };
  }

  private checkStock(
    orderItems: OrderItemDto[],
    menuItemsMap: Map<string, IMenuItem>,
  ) {
    const insufficientStockItems: {
      name: string;
      requested: number;
      available: number;
    }[] = [];
    for (const orderItem of orderItems) {
      const menuItem = menuItemsMap.get(orderItem.menu_item_id)!;

      if (menuItem.stock < orderItem.quantity) {
        insufficientStockItems.push({
          name: menuItem.name,
          requested: orderItem.quantity,
          available: menuItem.stock,
        });
      }

      if (insufficientStockItems.length > 0) {
        throw new BadRequestException({
          message: 'Insufficient stock for one or more items.',
          insufficientStockItems,
        });
      }
    }
  }

  private validateItems(menuItemIds: string[], menuItems: IMenuItem[]) {
    if (menuItemIds.length !== menuItems.length) {
      const foundIds = new Set(menuItems.map((item) => item.id));
      const missingIds = menuItemIds.filter((id) => !foundIds.has(id));

      throw new NotFoundException({
        message: 'Some menu items were not found',
        missingIds,
      });
    }

    if (menuItems.length === 0) {
      throw new NotFoundException('No valid menu items found');
    }

    const unAvailableItems = menuItems.filter((item) => !item.is_available);

    if (unAvailableItems.length > 0) {
      throw new BadRequestException({
        message: 'Some menu item are not available',
        unAvailableItems,
      });
    }

    const restaurantId = menuItems[0].restaurant_id;

    const allMenuItemsHaveSameRestaurantId = menuItems.every(
      (item) => item.restaurant_id === restaurantId,
    );

    if (!allMenuItemsHaveSameRestaurantId) {
      throw new BadRequestException(
        'Cannot order from multiple restaurants at once',
      );
    }

    return restaurantId;
  }
}
