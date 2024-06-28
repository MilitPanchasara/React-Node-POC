import { Router, Request, Response } from 'express';
import { GetRoles, AddRoles, UpdateRoles, DeleteRoles } from '../controllers/customer.controller';
import { Customers } from '../entity/Customers';

const CustomerRoute: Router = Router();

// Basic CRUD Routing

CustomerRoute.get('/Customer', GetRoles, async (req: Request, res: Response) => {
  res.status(200).send(res.locals.results);
});

CustomerRoute.post('/Customer', AddRoles, async (req: Request, res: Response) => {
  res.status(200).send(res.locals.AddedRoles);
});

CustomerRoute.put('/Customer', UpdateRoles, async (req: Request, res: Response) => {
  res.status(200).send(res.locals.UpdatedRole);
});

CustomerRoute.delete('/Customer', DeleteRoles, async (req: Request, res: Response) => {
  res.status(200).send(res.locals.DeletedRoles);
});

export default CustomerRoute;