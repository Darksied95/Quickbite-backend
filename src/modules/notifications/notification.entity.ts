import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { CustomerProfile } from '../customers/customer.entity';

export enum NotificationType {
    ORDER = 'order',
    DELIVERY = 'delivery',
    PAYMENT = 'payment',
}

@Entity({ name: 'notifications' })
@Index(['user'])
export class Notification {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => CustomerProfile, { onDelete: 'CASCADE', onUpdate: 'CASCADE', })
    @JoinColumn({ name: 'user_id' })
    user: CustomerProfile;

    @Column({ type: 'enum', enum: NotificationType })
    type: NotificationType;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'text' })
    message: string;

    @Column({ type: 'boolean', default: false })
    is_read: boolean;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date;
}