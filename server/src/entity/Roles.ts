import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Roles {

    @PrimaryGeneratedColumn()
    RoleId: number

    @Column({ type: "varchar", length: 50 })
    RoleName: string

    @Column()
    StatusId: number

    @Column()
    CreatedBy: number

    @CreateDateColumn()
    CreatedDate: Date

    @Column()
    UpdatedBy: string

    @UpdateDateColumn()
    UpdatedDate: Date
}
