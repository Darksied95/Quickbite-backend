export const USER_ROLES_VALUES = ['driver', 'customer', 'restaurant_owner', 'admin'] as const

export type USER_ROLES = typeof USER_ROLES_VALUES[number]


export const USER_STATUS_VALUES = ["active", "inactive", "suspended"] as const
export type USER_STATUS = typeof USER_STATUS_VALUES[number]