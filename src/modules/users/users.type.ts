export interface IUser {
    email: string
    first_name: string
    last_name: string
    password: string
    phone: string
    user_type: 'customer' | 'driver' | 'restaurant_owner'
    id: string
    is_active: boolean
    created_at: Date
    updated_at: Date
}