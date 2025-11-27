import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { RestaurantProfile } from './restaurant.entity';

@Entity({ name: 'menu_categories' })
@Index('IDX_MENU_CATEGORY_RESTAURANT', ['restaurant'])
export class MenuCategory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => RestaurantProfile, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'restaurant_id' })
    restaurant: RestaurantProfile;

    @Column({ default: true })
    is_active: boolean;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;
}
