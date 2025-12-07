export const ORDER_STATUS = [
  'pending',
  'accepted',
  'ready_for_pickup',
  'picked_up',
  'delivered',
  'restaurant_rejected',
] as const;

export enum DELIVERY_STATUS {
  driver_assigned = 'driver_assigned',
  picked_up = 'picked_up',
  delivery_attempted = 'delivery_attempted',
  delivered = 'delivered',
}

export type IOrderStatus = (typeof ORDER_STATUS)[number];
export const ORDER_STATUS_VALUES = Object.values(ORDER_STATUS);

export const DELIVERY_STATUS_VALUES = Object.values(DELIVERY_STATUS);
