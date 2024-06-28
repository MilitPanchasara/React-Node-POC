import { Router, Request, Response } from 'express';
import * as RoleController from '../controllers/roles.controller';
import { GetRoles, AddRoles, UpdateRoles, DeleteRoles } from '../controllers/roles.controller';
import { Roles } from '../entity/Roles';
const RoleRoute: Router = Router();

// Basic CRUD Routing

RoleRoute.get('/Roles', GetRoles, async (req: Request, res: Response) => {
  res.status(200).send(res.locals.results);
});

RoleRoute.post('/Roles', AddRoles, async (req: Request, res: Response) => {
  res.status(200).send(res.locals.AddedRoles);
});

RoleRoute.put('/Roles', UpdateRoles, async (req: Request, res: Response) => {
  res.status(200).send(res.locals.UpdatedRole);
});

RoleRoute.delete('/Roles', DeleteRoles, async (req: Request, res: Response) => {
  res.status(200).send(res.locals.DeletedRoles);
});

export default RoleRoute;