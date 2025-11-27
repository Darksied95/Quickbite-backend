import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { RestaurantProfile } from '../../restaurants/entities/restaurant.entity';
import { DriverProfile } from '../../drivers/entities/driver.entity';
import { CustomerProfile } from '../../customers/customer.entity';
import { Address } from '../../addresses/addresses.entity';
import { ORDER_STATUS } from '../order.constant';


@Entity({ name: 'orders' })
@Index(['restaurant_id'])
@Index(['driver_id'])
@Index(['customer_id'])

export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => RestaurantProfile, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'restaurant_id' })
    restaurant: RestaurantProfile;

    @ManyToOne(() => DriverProfile, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'driver_id' })
    driver: DriverProfile;

    @ManyToOne(() => CustomerProfile, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'customer_id' })
    customer: CustomerProfile;

    @ManyToOne(() => Address, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'customer_address_id' })
    customer_address: Address;

    @Column({ type: 'enum', enum: ORDER_STATUS, default: ORDER_STATUS.pending })
    status: ORDER_STATUS;

    @Column({ type: 'varchar', unique: true })
    order_number: string;

    @Column({ type: 'int' })
    total_cost: number;

    @Column({ type: 'int' })
    delivery_fee: number;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;
}