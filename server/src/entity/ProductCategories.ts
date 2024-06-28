import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from "typeorm"

@Entity()
export class Productcategories {

    @PrimaryGeneratedColumn()
    ProductcategoryId: number

    @Column({ type: "varchar", length: 50 })
    ProductcategoryName: string

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
