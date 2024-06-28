import { Request, Response, NextFunction } from 'express';
import { HttpStatusCodes } from '../enums/error';

const authorizeRole = (rolesArray: string[]) => (req: Request, res: Response, next: NextFunction) => {
  const authorized = rolesArray.includes(res.locals.tokendata.role);

  if (authorized) {
    return next();
  }

  next({ error: { status: HttpStatusCodes.UNAUTHORIZED, message: "Unauthorized Access" } });
};

export default authorizeRole;