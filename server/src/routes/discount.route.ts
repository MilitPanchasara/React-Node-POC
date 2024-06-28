import { Router, Request, Response } from 'express';
import { GetRoles, AddRoles, UpdateRoles, DeleteRoles } from '../controllers/discount.controller';
import { Roles } from '../entity/Roles';

const discountRoute: Router = Router();

// Basic CRUD Routing

discountRoute.get('/Discount', GetRoles, async (req: Request, res: Response) => {
  res.status(200).send(res.locals.results);
});

discountRoute.post('/Discount', AddRoles, async (req: Request, res: Response) => {
  res.status(200).send(res.locals.AddedRoles);
});

discountRoute.put('/Discount', UpdateRoles, async (req: Request, res: Response) => {
  res.status(200).send(res.locals.UpdatedRole);
});

discountRoute.delete('/Discount', DeleteRoles, async (req: Request, res: Response) => {
  res.status(200).send(res.locals.DeletedRoles);
});

export default discountRoute;