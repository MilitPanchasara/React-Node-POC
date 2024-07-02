import { Vendors } from '../entity/Vendors';
import { User } from '../entity/User';

declare global {
  namespace Express {
    interface Request {
      user?: User; // Define the type of 'user' according to your application's requirements
      Vendor?: Vendors; // Define the type of 'user' according to your application's requirements
    }
  }
}
