import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Order } from '../orders/entities/order.entity';
import { DELIVERY_STATUS } from '../orders/order.constant';


@Entity({ name: 'delivery_tracking' })
@Index(['order'])

export class DeliveryTracking {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Order)
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @Column({ type: 'decimal', precision: 10, scale: 7 })
    longitude: number;

    @Column({ type: 'decimal', precision: 10, scale: 7 })
    latitude: number;

    @Column({ type: 'enum', enum: DELIVERY_STATUS, nullable: true })
    status: DELIVERY_STATUS;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date;
}