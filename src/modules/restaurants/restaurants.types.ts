import { CreateRestaurantDto } from "./dto/create-restaurant.dto";

export type CreateRestaurantInRepository = Omit<CreateRestaurantDto, 'address' | 'image'> & { logo_url?: string };