import { Request, Response, NextFunction } from 'express';
import { HttpStatusCodes } from '../enums/error';
import { AppDataSource } from '../config/data-source';
import { Customers } from '../entity/Customers';
import Joi from 'joi';
import { customerDetails } from '../models/customerModel';
import { Status } from '../enums/status';


const customerRepository = AppDataSource.getRepository(Customers)

const customerValidations = Joi.object().keys({
  customerName: Joi.string().required().min(4).max(50),
  customerDetails: Joi.string().required().min(50).max(200),
  contactNumber: Joi.allow(),
  email: Joi.string().required().email(),
  birthDate: Joi.date().required(),
  customerTypeId: Joi.number().required(),
  customerRoleId: Joi.number().required(),
  isActive: Joi.boolean().required()
});

const GetCustomers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await customerRepository.find();
    res.locals.results = result;
    next();
  } catch (error) {
    next({ error: { status: HttpStatusCodes.SERVER_ERROR, message: error.message } });
  }
};

const AddCustomers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { error } = customerValidations.validate(req.body);
    if (error) {
      next({
        error: {
          status: HttpStatusCodes.BAD_REQUEST,
          message: error.message,
        },
      });
    }
    else {
      const customerDetail = req.body as customerDetails;
      var customer = new Customers();
      customer.CustomerName = customerDetail.customerName;
      customer.CustomerDetails = customerDetail.customerDetails;
      customer.ContactNumber = customerDetail.contactNumber;
      customer.Email = customerDetail.email;
      customer.CustomerPhotoPath = req.file.filename;
      customer.BirthDate = customerDetail.birthDate;
      customer.CustomerTypeId = customerDetail.customerTypeId;
      customer.IsActive = customerDetail.isActive;
      customer.CustomerRoleId = customerDetail.customerRoleId;
      customer.StatusId = Status.Active
      customer.CreatedBy = 1;
      customer.UpdatedBy = 1;
      customer.UserIpAddress = '';
      const data = await customerRepository.save(customer);
      next();
    }
  } catch (error) {
    next({ error: { status: HttpStatusCodes.SERVER_ERROR, message: error.message } });
  }
};

const UpdateCustomers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { error } = customerValidations.validate(req.body);
    if (error) {
      next({
        error: {
          status: HttpStatusCodes.BAD_REQUEST,
          message: error.message,
        },
      });
    }
    else {
      const id = parseInt(req.query.id as string, 10);

      const customerDetail = req.body as customerDetails;
      var customer = new Customers();

      customer.CustomerName = customerDetail.customerName;
      customer.CustomerDetails = customerDetail.customerDetails;
      customer.ContactNumber = customerDetail.contactNumber;
      customer.Email = customerDetail.email;
      customer.CustomerPhotoPath = req.file.filename;
      customer.BirthDate = customerDetail.birthDate;
      customer.CustomerTypeId = customerDetail.customerTypeId;
      customer.IsActive = customerDetail.isActive;
      customer.CustomerRoleId = customerDetail.customerRoleId;
      customer.UpdatedBy = 1;

      await customerRepository.update(id, customer);
      res.locals.UpdatedRole = `customer Id : ${id} Updated Successfully`;
      next();
    }
  } catch (error) {
    next({ error: { status: HttpStatusCodes.SERVER_ERROR, message: error.message } });
  }
};

const DeleteCustomers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.query.id as string, 10);
    await customerRepository.delete(id)
    res.locals.DeletedRoles = `customer Id : ${id} Deleted Successfully`;
    next();
  } catch (error) {
    next({ error: { status: HttpStatusCodes.SERVER_ERROR, message: error.message } });
  }
};

export { GetCustomers, AddCustomers, UpdateCustomers, DeleteCustomers };