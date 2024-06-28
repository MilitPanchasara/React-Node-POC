import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from "typeorm"

@Entity()
export class VendorTypes {

    @PrimaryGeneratedColumn()
    VendorTypeId: number

    @Column({ type: "varchar", length: 50 })
    VendorTypeName: string

    @Column()
    StatusId: number

    @Column()
    CreatedBy: number

    @CreateDateColumn()
    CreatedAt: Date

    @Column()
    UpdatedBy: number

    @UpdateDateColumn()
    UpdatedAt: Date
}
