import { CreateRestaurantDto } from "./dto/create-restaurant.dto";

export type CreateRestaurantInRepository = Omit<CreateRestaurantDto, 'addresses' | 'image'> & { logo_url?: string };