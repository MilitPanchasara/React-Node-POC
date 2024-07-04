import { Router, Request, Response } from 'express';
import  * as UserController from '../controllers/user.controller';
import authentication from '../middlewares/authentication';
import generateToken from '../middlewares/tokencreate';
import cookieParser from 'cookie-parser';


const UserRoute = Router();

UserRoute.get('/User', UserController.GetUsers, async (req: Request, res: Response) => {
  res.status(200).send(res.locals.results);
});

// For User Login with email and password params.
UserRoute.post(
  '/login',
  cookieParser(),
  UserController.getUserByEmail,
  generateToken,
  async (req: Request, res: Response) => {
    res.cookie('acess_token', res.locals.userdata.token, {
      httpOnly: false,
      expires: new Date(Date.now() + 120 * 60 * 1000),
      secure: true,
    });
    res.cookie('userName', res.locals.userdata.username, {
      httpOnly: false,
      expires: new Date(Date.now() + 120 * 60 * 1000),
      secure: true,
    });
    res.status(200).json({
      message: 'Logged in successfully',
    });
  }
);

// For Token verification.
UserRoute.get('/verify', authentication, async (req: Request, res: Response) => {
  res.status(200).send(res.locals.tokendata);
});

// Signup Apis for user with password hash
UserRoute.post('/SignUp', UserController.AddUser, async (req: Request, res: Response) => {
  res.status(200).send(res.locals.SignupStatus);
});


UserRoute.get('/getUserById', UserController.getUserById, async (req: Request, res: Response) => {
  res.status(200).send(res.locals.user);
});

export default UserRoute;