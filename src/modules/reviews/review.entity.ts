import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { RestaurantProfile } from '../restaurants/entities/restaurant.entity';
import { CustomerProfile } from '../customers/customer.entity';
import { Order } from '../orders/entities/order.entity';

@Entity({ name: 'reviews' })
@Index(['restaurant'])
@Index(['customer'])
@Index(['order'])
@Index(['restaurant_rating'])
@Index(['driver_rating'])

export class Review {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => RestaurantProfile, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'restaurant_id' })
    restaurant: RestaurantProfile;

    @ManyToOne(() => CustomerProfile, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'customer_id' })
    customer: CustomerProfile;

    @ManyToOne(() => Order, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @Column({ type: 'smallint' })
    restaurant_rating: number;

    @Column({ type: 'smallint' })
    driver_rating: number;

    @Column({ type: 'text', nullable: true })
    comment: string;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date;
}