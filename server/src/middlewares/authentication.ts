import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import {User} from '../entity/User';
import { Roles } from '../enums/Roles';
import { getUserByEmail } from '../controllers/user.controller';

const Authentication = async (req: Request, res: Response, next: NextFunction) => {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log(token)

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err: VerifyErrors | null, user: any) => {
    if (err) {
      console.log(err)
      return res.sendStatus(403);
    }
    (req as any).user = user;
    res.locals.tokendata = user;
    next();
  });
};

export default Authentication;