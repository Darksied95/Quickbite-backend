import { Injectable } from '@nestjs/common';
import { OrderItemDto } from '../dto/create-order.dto';
import { IMenuItem } from 'src/database/drizzle.schema';

type Props = {
  userId: string;
  addressId: string;
  orderItems: OrderItemDto[];
  context: { restaurantId: string; menuItemsMap: Map<string, IMenuItem> };
};
@Injectable()
export class OrderFactory {
  buildOrderData({ userId, addressId, orderItems, context }: Props) {
    const totalCost = orderItems.reduce((acc, order) => {
      const menuItem = context.menuItemsMap.get(order.menu_item_id)!;
      return acc + menuItem.price * order.quantity;
    }, 0);

    const initialOrder = {
      restaurant_id: context.restaurantId,
      customer_id: userId,
      customer_address_id: addressId,
      total_cost: totalCost,
      delivery_fee: 0,
    };

    const orderItemsData = orderItems.map((item) => {
      const menuItem = context.menuItemsMap.get(item.menu_item_id)!;
      return {
        menu_item_id: menuItem.id,
        quantity: item.quantity,
        menu_item_name: menuItem.name,
        price_at_time_of_order: menuItem.price,
      };
    });

    return { initialOrder, orderItemsData };
  }
}
