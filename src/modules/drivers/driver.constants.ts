export const VEHICLE_TYPE_VALUE = ["car", "motorbike", "bicycle"] as const
export type VEHICLE_TYPE = typeof VEHICLE_TYPE_VALUE[number]

export const DRIVER_DELIVERY_STATUS_VALUE = [
    'assigned',
    "picked_up",
    'unassigned',
    'delivered',
    'cancelled'
] as const