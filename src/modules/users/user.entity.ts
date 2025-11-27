import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { USER_ROLES, USER_STATUS } from "./user.constant";

@Entity()

export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar", length: 255, unique: true })
    email: string

    @Column({ type: "varchar", length: 255 })
    first_name: string

    @Column({ type: "varchar", length: 255 })
    last_name: string

    @Column({ type: "varchar", length: 255 })
    password: string

    @Column({ type: "varchar", length: 20 })
    phone: string

    @Index("role")
    @Column("enum", { enum: USER_ROLES })
    role: USER_ROLES

    @Column("enum", { enum: USER_STATUS, default: USER_STATUS.active })
    status: USER_STATUS

    @CreateDateColumn("timestamptz")
    created_at: Date

    @UpdateDateColumn("timestamptz")
    updated_at: Date
}