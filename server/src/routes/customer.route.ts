import { Router, Request, Response, NextFunction } from 'express';
import { GetCustomers, AddCustomers, UpdateCustomers, DeleteCustomers, GetCustomerById } from '../controllers/customer.controller';
import Joi from 'joi';
import { HttpStatusCodes } from '../enums/error';
import multer from 'multer';
// import * from '../../../client/public/storage/'

const CustomerRoute: Router = Router();

const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: Function
  ) {
    cb(null, "./storage/UploadCustomerPhoto");
  },
  filename: function (req: Request, file: Express.Multer.File, cb: Function) {
    cb(null, file.originalname);
  },
});

const uploadTemp = multer();
const upload = multer({ storage: storage });

// Basic CRUD Routing

CustomerRoute.get('/Customer', GetCustomers, async (req: Request, res: Response) => {
  res.status(200).send(res.locals.results);
});

CustomerRoute.post('/Customer',
  uploadTemp.single('customerImage'),
  AddCustomers,
  async (req: Request, res: Response) => {
    res.status(200).send(res.locals.AddedRoles);
  });

CustomerRoute.put('/Customer',
  upload.single('customerImage'),
  UpdateCustomers,
  async (req: Request, res: Response) => {
    res.status(200).send(res.locals.UpdatedRole);
  });

CustomerRoute.delete('/Customer', DeleteCustomers, async (req: Request, res: Response) => {
  res.status(200).send(res.locals.DeletedRoles);
});

CustomerRoute.get('/getCustomerById', GetCustomerById, async (req: Request, res: Response) => {
  res.status(200).send(res.locals.results);
});


export default CustomerRoute;