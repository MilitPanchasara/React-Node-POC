import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { HttpStatusCodes } from "../../enums/error";

export const createDiscountValidator = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.body) {
        return res.status(400).send({ message: 'Missing request body!' });
    }

    let minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 18);
    const discountValidations = Joi.object().keys({
        discountName: Joi.string().required().min(4).max(50),
        discountDescription: Joi.string().required().min(50).max(200),
        discountAmount: Joi.number(),
        requireCouponCode: Joi.boolean(),
        couponCode: Joi.string().min(5).max(5),
        validTillDate: Joi.date().min(minDate),
        discountBannerPath: Joi.allow(),
        discountCategoryId: Joi.number(),
        isActive: Joi.boolean(),
        discountTypeId: Joi.number(),
    });

    let { error } = discountValidations.validate(req.body);
    if (error) {
        res.status(HttpStatusCodes.BAD_REQUEST).send(error.message);
        return;
    } else {
        next();
    }
};