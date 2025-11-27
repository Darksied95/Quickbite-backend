import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity({ name: 'customer_profiles' })
export class CustomerProfile {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    @Column({ type: 'uuid', unique: true })
    user_id: string;

    @Column({ type: 'int', default: 0 })
    total_orders: number;

    @Column({ type: 'bigint', default: 0 })
    total_spent: number;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;

    @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deleted_at?: Date;
}
