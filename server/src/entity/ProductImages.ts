import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { Products } from "./Products";

@Entity()
export class ProductImages {

    @PrimaryGeneratedColumn()
    ProductImageId: number

    @Column()
    ProductId: number

    @ManyToOne(() => Products)
    @JoinColumn({ name: "ProductId" })
    Product: Products;

    @Column({ type: "varchar", length: 250 })
    ImagePath: string

    @Column()
    SequenceNumber: number

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
