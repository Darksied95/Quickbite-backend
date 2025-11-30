export const ORDER_STATUS = [
    'pending',
    'delivered',
    'accepted',
    'restaurant_rejected',
    'customer_cancelled',
    'driver_cancelled',
    'ready_for_pickup',
    'in_transit',
]

export enum DELIVERY_STATUS {
    driver_assigned = 'driver_assigned',
    picked_up = 'picked_up',
    delivery_attempted = 'delivery_attempted',
    delivered = 'delivered',
}

export const ORDER_STATUS_VALUES = Object.values(ORDER_STATUS)

export const DELIVERY_STATUS_VALUES = Object.values(DELIVERY_STATUS)