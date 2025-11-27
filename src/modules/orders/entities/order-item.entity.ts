import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { MenuItem } from '../../restaurants/entities/menu-item.entity';

@Entity({ name: 'order_items' })
@Index(['order'])
@Index(['menuItem'])
export class OrderItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Order)
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @ManyToOne(() => MenuItem)
    @JoinColumn({ name: 'menu_item_id' })
    menuItem: MenuItem;

    @Column({ type: 'int' })
    quantity: number;

    @Column({ type: 'int' })
    price_at_time_of_order: number;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;
}