import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { DriverProfile } from '../drivers/entities/driver.entity';
import { Order } from '../orders/entities/order.entity'

export enum TransactionStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    FAILED = 'failed',
}

@Entity({ name: 'driver_transactions' })
@Index(['driver'])
@Index(['order'])
export class DriverTransaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => DriverProfile, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'driver_id' })
    driver: DriverProfile;

    @ManyToOne(() => Order)
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @Column({ type: 'varchar', nullable: false })
    payment_method: string;

    @Column({
        type: 'enum',
        enum: TransactionStatus,
        default: TransactionStatus.PENDING,
        nullable: false,
    })
    status: TransactionStatus;

    @Column({ type: 'bigint' })
    amount: number;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date;
}