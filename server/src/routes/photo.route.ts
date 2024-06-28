import { Router, Request, Response } from 'express';
import { GetRoles, AddRoles, UpdateRoles, DeleteRoles } from '../controllers/photo.controller';
import { Roles } from '../entity/Roles';

const photoRoute: Router = Router();

// Basic CRUD Routing

photoRoute.get('/Photo', GetRoles, async (req: Request, res: Response) => {
  res.status(200).send(res.locals.results);
});

photoRoute.post('/Photo', AddRoles, async (req: Request, res: Response) => {
  res.status(200).send(res.locals.AddedRoles);
});

photoRoute.put('/Photo', UpdateRoles, async (req: Request, res: Response) => {
  res.status(200).send(res.locals.UpdatedRole);
});

photoRoute.delete('/Photo', DeleteRoles, async (req: Request, res: Response) => {
  res.status(200).send(res.locals.DeletedRoles);
});

export default photoRoute;