import { CustomerProfilesTable } from "src/database/tables/table.type";

export type ICreateCustomer = Pick<CustomerProfilesTable, 'user_id'>;
export type IUpdateCustomer = Pick<
  CustomerProfilesTable,
  'total_orders' | 'total_spent'
>;
