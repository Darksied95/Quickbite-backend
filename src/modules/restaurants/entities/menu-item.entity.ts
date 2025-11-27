import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Index, DeleteDateColumn } from 'typeorm';
import { MenuCategory } from './menu-category.entity';
import { RestaurantProfile } from '././restaurant.entity';

@Entity({ name: 'menu_items' })
@Index('IDX_MENU_ITEM_CATEGORY', ['category'])
@Index('IDX_MENU_ITEM_RESTAURANT', ['restaurant'])

export class MenuItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => MenuCategory, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'category_id' })
    category: MenuCategory;

    @ManyToOne(() => RestaurantProfile, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'restaurant_id' })
    restaurant: RestaurantProfile;

    @Column({ type: 'int', default: 0 })
    stock: number;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'int' })
    price: number;

    @Column({ default: true })
    is_available: boolean;

    @Column({ nullable: true })
    image_url?: string;

    @DeleteDateColumn({ type: 'timestamptz' })
    deleted_at?: Date;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;
}
