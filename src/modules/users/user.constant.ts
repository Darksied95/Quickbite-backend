export enum USER_ROLES {
    driver = 'driver',
    customer = 'customer',
    restaurant_owner = 'restaurant_owner',
    admin = 'admin'
}

export enum USER_STATUS {
    active = 'active',
    inactive = 'inactive',
    suspended = 'suspended'
}

export const USER_ROLES_VALUES = Object.values(USER_ROLES)
export const USER_STATUS_VALUES = Object.values(USER_STATUS)