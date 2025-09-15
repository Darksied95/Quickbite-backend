export interface ICustomerProfile {
  id: string;
  user_id: string;
  total_orders: number;
  total_spent?: number;
  created_at: Date;
  updated_at: Date;
}

export type ICreateCustomer = Pick<ICustomerProfile, 'user_id'>;
export type IUpdateCustomer = Pick<
  ICustomerProfile,
  'total_orders' | 'total_spent'
>;
