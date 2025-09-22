import { USER_ROLES, USER_STATUS } from "src/modules/users/user.constant";
import { TableNames } from "./table.constant";
import { Knex } from "knex";

export type TypedKnex = Knex<DatabaseSchemaTypes>;

export interface DatabaseSchemaTypes {
    [TableNames.Users]: UserTable,
    [TableNames.Addresses]: AddressTable,
    [TableNames.CustomerProfiles]: CustomerProfilesTable,
    [TableNames.Tokens]: TokensTable,
    [TableNames.AdminProfiles]: AdminProfileTable,
    [TableNames.RestaurantProfiles]: RestaurantProfileTable,
    [TableNames.DriverProfiles]: DriverProfileTable,
    [TableNames.MenuCategories]: MenuCategoryTable,
    [TableNames.MenuItems]: MenuItemTable,
    [TableNames.DriverLocations]: DriverLocationTable,
    [TableNames.Orders]: OrderTable,
    [TableNames.OrderItems]: OrderItemTable,
    [TableNames.DeliveryTracking]: DeliveryTrackingTable,
    [TableNames.Payments]: PaymentTable,
    [TableNames.DriverTransactions]: DriverTransactionTable,
    [TableNames.Reviews]: ReviewTable,
    [TableNames.Inventories]: InventoryTable,
    [TableNames.Notifications]: NotificationTable,
}



export interface TokensTable {
    id: string
    token: string
    user_id: string
    is_revoked: boolean
    expires_at: Date
    created_at: Date
    updated_at: Date
}

export interface UserTable {
    id: string
    email: string
    first_name: string
    last_name: string
    password: string
    phone: string
    role: typeof USER_ROLES[number]
    status: typeof USER_STATUS[number]
    created_at: Date
    updated_at: Date
}

export interface AddressTable {
    id: string
    user_id: string,
    street_address: string
    apartment_unit: string
    city: string
    state: string
    postal_code: string
    country: string
    latitude: number
    longitude: number
    is_default: boolean
    label: string
    delivery_instructions: string
    created_at: Date
    updated_at: Date
}



export interface AdminProfileTable {
    id: string
    user_id: string
    created_at: Date
    updated_at: Date
}

export interface CustomerProfilesTable {
    id: string
    user_id: string
    total_orders: number
    total_spent: number
    created_at: Date
    updated_at: Date
}

export interface RestaurantProfileTable {
    id: string
    user_id: string
    name: string
    owner_id: string
    address_id: string
    phone: string
    email: string
    description: string
    logo_url: string
    is_active: boolean
    created_at: Date
    updated_at: Date
}

export interface DriverProfileTable {
    id: string
    user_id: string
    vehicle_type: string
    total_rides: number
    status: string
    is_available: boolean
    created_at: Date
    updated_at: Date
}

export interface MenuCategoryTable {
    id: string
    name: string
    restaurant_id: string
    is_active: boolean
    created_at: Date
    updated_at: Date
}

export interface MenuItemTable {
    id: string
    name: string
    description: string
    price: number
    image_url: string
    restaurant_id: string
    ingredients: string[]
    is_available: boolean
    created_at: Date
    updated_at: Date
}

export interface DriverLocationTable {
    id: string
    driver_id: string
    latitude: number
    longitude: number
    created_at: Date
    updated_at: Date
}

export interface OrderTable {
    id: string
    restaurant_id: string
    driver_id: string
    customer_id: string
    customer_address_id: string
    status: string
    order_number: string
    total_cost: number
    delivery_fee: number
    created_at: Date
    updated_at: Date
}

export interface OrderItemTable {
    id: string
    order_id: string
    menu_item_id: string
    quantity: number
    price_at_time_of_order: number
    created_at: Date
    updated_at: Date
}

export interface PaymentTable {
    id: string
    order_id: string
    transaction_id: string
    payment_method: string
    status: string
    amount: number
    created_at: Date
    updated_at: Date
}

export interface DriverTransactionTable {
    id: string
    driver_id: string
    order_id: string
    payment_method: string
    status: string
    amount: number
    created_at: Date
    updated_at: Date
}

export interface ReviewTable {
    id: string
    restaurant_id: string
    customer_id: string
    order_id: string
    restaurant_rating: number
    driver_rating: number
    comment: string
    created_at: Date
    updated_at: Date
}

export interface InventoryTable {
    id: string
    restaurant_id: string
    item_id: string
    quantity: number
    created_at: Date
    updated_at: Date
}

export interface NotificationTable {
    id: string
    user_id: string
    type: string
    title: string
    message: string
    is_read: boolean
    created_at: Date
    updated_at: Date
}

export interface DeliveryTrackingTable {
    id: string
    order_id: string
    delivery_status: string
    longitude: number
    latitude: number
    status: string
    created_at: Date
    updated_at: Date
}

