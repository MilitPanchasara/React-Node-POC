import { Router, Request, Response } from 'express';
import { getDiscounts, addDiscount, UpdateRoles, DeleteRoles } from '../controllers/discount.controller';
import { createDiscountValidator } from '../middlewares/validators/discount-validators.middleware';

const discountRoute: Router = Router();

// Basic CRUD Routing

discountRoute.post('/discounts', getDiscounts, async (req: Request, res: Response) => {
  res.status(200).send(res.locals.results);
});

discountRoute.post('/discount', createDiscountValidator, addDiscount);

discountRoute.put('/Discount', UpdateRoles, async (req: Request, res: Response) => {
  res.status(200).send(res.locals.UpdatedRole);
});

discountRoute.delete('/Discount', DeleteRoles, async (req: Request, res: Response) => {
  res.status(200).send(res.locals.DeletedRoles);
});

export default discountRoute;