import { Request } from 'express';
import { User } from '../entity/User';
import { Vendors } from '../entity/Vendors';

declare global {
  namespace Express {
    interface Request {
      user?: User; // Define the type of 'user' according to your application's requirements
      Vendor?: Vendors; // Define the type of 'user' according to your application's requirements
    }
  }
}
