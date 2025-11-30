export const VEHICLE_TYPE_VALUE = ["car", "motorbike", "bicycle"] as const
export type VEHICLE_TYPE = typeof VEHICLE_TYPE_VALUE[number]