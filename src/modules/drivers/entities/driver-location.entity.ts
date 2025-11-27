import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { DriverProfile } from './driver.entity';

@Entity({ name: 'driver_locations' })
@Index('IDX_DRIVER_LOCATION_DRIVER', ['driver'])

export class DriverLocation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => DriverProfile, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'driver_id' })
    driver: DriverProfile;

    @Column({ type: 'decimal', precision: 10, scale: 8 })
    latitude: number;

    @Column({ type: 'decimal', precision: 11, scale: 8 })
    longitude: number;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;
}
