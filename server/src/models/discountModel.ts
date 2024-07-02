import { Discount } from "../entity/Discount";
import { Status } from "../enums/status";

export class DiscountModel {
    discountId: number;

    discountName: string;

    discountDescription: string;

    discountAmount: number;
    
    requireCouponCode: boolean;

    couponCode: string;

    validTillDate: Date;

    discountBannerPath: string;
    discountCategoryId: number;
    isActive: boolean;
    discountTypeId: number;

    createdAt: Date;
    createdBy: number;
    updatedAt: Date;
    updatedBy: number;
    userIpAddress: string;

    toEntityModel = (existingEntity: Discount = null) => {
        let discount = new Discount();
        discount.discountId = this.discountId ?? 0;
        discount.discountName = this.discountName,
        discount.discountDescription = this.discountDescription;
        discount.discountAmount = this.discountAmount;
        discount.requireCouponCode = this.requireCouponCode;
        discount.couponCode = this.couponCode;
        discount.validTillDate = this.validTillDate;
        discount.discountBannerPath = this.discountBannerPath;
        discount.discountCategoryId = this.discountCategoryId;
        discount.isActive = this.isActive;
        discount.discountTypeId = this.discountTypeId;
        discount.statusId = Status.Active;
        discount.createdAt = this.createdAt ? this.createdAt : existingEntity?.createdAt;
        discount.createdBy = this.createdBy ? this.createdBy : existingEntity?.createdBy;
        discount.updatedAt = this.updatedAt ? this.updatedAt : existingEntity?.updatedAt;
        discount.updatedBy = this.updatedBy ? this.updatedBy : existingEntity?.updatedBy;
        discount.userIpAddress = this.userIpAddress ? this.userIpAddress : existingEntity?.userIpAddress;
        return discount;
    }
}