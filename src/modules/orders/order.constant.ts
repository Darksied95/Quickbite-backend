export const ORDER_STATUS = [
    'pending',
    'delivered',
    'accepted',
    'restaurant_rejected',
    'customer_cancelled',
    'driver_cancelled',
    'ready_for_pickup',
    'in_transit',
] as const;

export const DELIVERY_STATUS = [
    'driver_assigned',
    'picked_up',
    'delivery_attempted',
    'delivered',
]