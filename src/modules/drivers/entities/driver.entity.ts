import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Index, DeleteDateColumn } from 'typeorm';
import { User } from '../../users/user.entity';
import { USER_STATUS } from '../../users/user.constant';
import { VEHICLE_TYPE } from '../driver.constants';

@Entity({ name: 'driver_profiles' })
@Index('IDX_DRIVER_STATUS', ['status'])
@Index('IDX_DRIVER_AVAILABLE', ['is_available'])

export class DriverProfile {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ type: 'enum', enum: VEHICLE_TYPE })
    vehicle_type: VEHICLE_TYPE;

    @Column({ type: 'int', default: 0 })
    total_rides: number;

    @Column({ type: 'enum', enum: USER_STATUS, default: USER_STATUS.active })
    status: USER_STATUS;

    @Column({ default: false })
    is_available: boolean;

    @DeleteDateColumn({ type: 'timestamptz' })
    deleted_at?: Date;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;
}
