import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Roles } from '../enums/Roles'; // Adjust path as per your project structure
import { string } from 'joi';

const generateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let credential: any = {};
    const role = Roles[res.locals.User.RoleId];

    if (role) {
      credential = {
        role: res.locals.User.RoleId,
        email: res.locals.User.Email,
        fullName:res.locals.User.FirstName+' '+res.locals.User.LastName
      };

      const token = jwt.sign(credential, process.env.JWT_SECRET_KEY as string, {
        expiresIn: '1d',
      });
      var userName = res.locals.User.FirstName+' '+res.locals.User.LastName
      res.locals.userdata = { token, username: userName  };
      next();
    } else {
      throw new Error('Role not found');
    }
  } catch (error) {
    console.error('Error generating token:', error);
    next(error);
  }
};

export default generateToken;