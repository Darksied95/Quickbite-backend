import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Index, DeleteDateColumn } from 'typeorm';
import { User } from '../../users/user.entity';
import { Restaurant_APPROVAL_STATES } from '../restaurant.constant';

@Entity({ name: 'restaurant_profiles' })
@Index('IDX_OWNER_ID', ['owner'])
@Index('IDX_OWNER_STATUS', ['owner', 'status'])
@Index('IDX_IS_ACTIVE', ['is_active'])

export class RestaurantProfile {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'owner_id' })
    owner: User;

    @Column({ nullable: true, type: 'varchar', length: 20 })
    phone?: string;

    @Column({ nullable: true, type: 'varchar', length: 255 })
    email?: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ nullable: true })
    logo_url?: string;

    @Column({ default: true })
    is_active: boolean;

    @Column({
        type: 'enum',
        enum: Restaurant_APPROVAL_STATES,
        default: Restaurant_APPROVAL_STATES.Pending
    })
    status: Restaurant_APPROVAL_STATES;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @DeleteDateColumn({ type: 'timestamptz' })
    deleted_at?: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;
}
