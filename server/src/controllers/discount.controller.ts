import { Request, Response, NextFunction } from 'express';
import { HttpStatusCodes } from '../enums/error';
import { AppDataSource } from '../config/data-source';
import { Discount } from '../entity/Discount';
import { DiscountModel } from '../models/discountModel';
import { plainToClass } from 'class-transformer';
import { QueryParamsModel } from '../models/queryParamsModel';
import { number } from 'joi';


const DiscountRepository = AppDataSource.getRepository(Discount);

const getDiscounts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queryParams = plainToClass(QueryParamsModel, req.body);
    let whereQuery$ = DiscountRepository.createQueryBuilder("d")
      .where("CAST(d.discountId as varchar) LIKE :filterString OR d.discountName LIKE :filterString", { filterString: `%${queryParams.commonFilter}%` });
    const discountsList = await whereQuery$
      .orderBy(`d.${queryParams.sortBy}`, queryParams.sortByDescending ? "DESC" : "ASC")
      .skip(queryParams.pageSize * (queryParams.currentPage - 1),)
      .take(queryParams.pageSize)
      .getMany();

    const totalCount = await whereQuery$.getCount();

    res.locals.results = { data: discountsList, totalCount };
    next();
  } catch (error) {
    next({ error: { status: HttpStatusCodes.SERVER_ERROR, message: error.message } });
  }
};

const addDiscount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const discount = plainToClass(DiscountModel, req.body);
    discount.userIpAddress = req.ip;
    discount.createdBy = 1;
    discount.updatedBy = 1;
    const discountEntity = discount.toEntityModel();
    const data = await DiscountRepository.save(discountEntity);
    console.log("xyz", data)
    res.locals.addedDiscount = discountEntity;
    res.status(200).send(res.locals.addedDiscount);
  } catch (error) {
    next({ error: { status: HttpStatusCodes.SERVER_ERROR, message: error.message } });
  }
};

const UpdateRoles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.query.id as string, 10);
    await DiscountRepository.update(id, req.body);
    res.locals.UpdatedRole = `Role Id : ${id} Updated Successfully`;
    next();
  } catch (error) {
    next({ error: { status: HttpStatusCodes.SERVER_ERROR, message: error.message } });
  }
};

const DeleteRoles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.query.id as string, 10);
    await DiscountRepository.delete(id)
    res.locals.DeletedRoles = `Role Id : ${id} Deleted Successfully`;
    next();
  } catch (error) {
    next({ error: { status: HttpStatusCodes.SERVER_ERROR, message: error.message } });
  }
};

export { UpdateRoles, DeleteRoles, addDiscount, getDiscounts };