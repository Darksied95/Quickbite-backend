import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum EntityType {
    USER = 'user',
    RESTAURANT = 'restaurant',
}

@Entity({ name: 'addresses' })
@Index(['latitude', 'longitude'])
@Index(['entity_id', 'entity_type'])

export class Address {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    entity_id: string;

    @Column({ type: 'enum', enum: EntityType })
    entity_type: EntityType;

    @Column()
    street_address: string;

    @Column({ nullable: true })
    apartment_unit?: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    postal_code: string;

    @Column()
    country: string;

    @Column('decimal', { precision: 10, scale: 8 })
    latitude: number;

    @Column('decimal', { precision: 11, scale: 8 })
    longitude: number;

    @Column({ default: false })
    is_default: boolean;

    @Column({ nullable: true })
    label?: string;

    @Column({ type: 'text', nullable: true })
    delivery_instructions?: string;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;
}
