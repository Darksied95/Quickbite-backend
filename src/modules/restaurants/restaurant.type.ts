import { CreateRestaurantDto } from "./dtos/create-restaurant.dto";

export type CreateRestaurantInRepository = Omit<CreateRestaurantDto, 'address' | 'image'> & { logo_url?: string };