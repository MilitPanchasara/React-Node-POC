import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { ApplicationObjects } from "./ApplicationObjeacts"

@Entity()
export class Discounts {

    @PrimaryGeneratedColumn()
    DiscountId: number

    @Column({ type: "varchar", length: 50 })
    DiscountName: string

    @Column({ type: "varchar", length: 200 })
    DiscountDescription: string

    @Column({ type: "decimal" })
    DiscountAmount: number

    @Column()
    RequireCouponCode: boolean

    @Column({ type: "varchar", length: 50 })
    CouponCode: string

    @Column()
    ValidTillDate: Date

    @Column({ type: "varchar", length: 250 })
    DiscountBannerPath: string

    @Column()
    DiscountCategoryId: number

    @ManyToOne(() => ApplicationObjects)
    @JoinColumn({ name: "DiscountCategoryId" })
    DiscountCategory: ApplicationObjects;

    @Column()
    IsActive: boolean

    @Column()
    DiscountTypeId: number

    @ManyToOne(() => ApplicationObjects)
    @JoinColumn({ name: "DiscountTypeId" })
    DiscountCategoryType: ApplicationObjects;

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

    @Column({ type: "varchar", length: 20 })
    UserIpAddress: string
}
