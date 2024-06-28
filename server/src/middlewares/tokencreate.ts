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
        role: role,
        contactNo: res.locals.User.UserPhoneNumber,
        email: res.locals.User.UserEmailId,
      };

      const token = jwt.sign(credential, process.env.JWT_SECRET_KEY as string, {
        expiresIn: '1d',
      });

      res.locals.userdata = { token, username:  res.locals.User.FirstName+res.locals.User.LastName };
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