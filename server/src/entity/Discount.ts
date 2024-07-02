import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { ApplicationObjects } from "./ApplicationObjeacts"

@Entity({ name: "discounts" })
export class Discount {

    @PrimaryGeneratedColumn({ name: "DiscountId" })
    discountId: number

    @Column({ name: "DiscountName", type: "varchar", length: 50 })
    discountName: string

    @Column({ name: "DiscountDescription", type: "varchar", length: 200 })
    discountDescription: string

    @Column({ name: "DiscountAmount", type: "decimal" })
    discountAmount: number

    @Column({ name: "RequireCouponCode" })
    requireCouponCode: boolean

    @Column({ name: "CouponCode", type: "varchar", length: 50 })
    couponCode: string

    @Column({ name: "ValidTillDate" })
    validTillDate: Date

    @Column({ name: "DiscountBannerPath", type: "varchar", length: 250 })
    discountBannerPath: string

    @Column({ name: "DiscountCategoryId" })
    discountCategoryId: number

    @ManyToOne(() => ApplicationObjects)
    @JoinColumn({ name: "DiscountCategoryId" })
    discountCategory: ApplicationObjects;

    @Column({ name: "IsActive" })
    isActive: boolean

    @Column({ name: "DiscountTypeId" })
    discountTypeId: number

    @ManyToOne(() => ApplicationObjects)
    @JoinColumn({ name: "DiscountTypeId" })
    discountCategoryType: ApplicationObjects;

    @Column({ name: "StatusId" })
    statusId: number

    @Column({ name: "CreatedBy" })
    createdBy: number

    @CreateDateColumn({ name: "CreatedAt" })
    createdAt: Date

    @Column({ name: "UpdatedBy" })
    updatedBy: number

    @UpdateDateColumn({ name: "UpdatedAt" })
    updatedAt: Date

    @Column({ name: "UserIpAddress", type: "varchar", length: 20 })
    userIpAddress: string
}
