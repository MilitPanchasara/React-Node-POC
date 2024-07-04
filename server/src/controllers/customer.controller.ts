import { Request, Response, NextFunction } from 'express';
import { HttpStatusCodes } from '../enums/error';
import { AppDataSource } from '../config/data-source';
import { Customers } from '../entity/Customers';
import Joi from 'joi';
import { customerDetails } from '../models/customerModel';
import { Status } from '../enums/status';
import { ApplicationObjects } from '../entity/ApplicationObjeacts';

const customerRepository = AppDataSource.getRepository(Customers)
const applicationObjectRepository = AppDataSource.getRepository(ApplicationObjects)

const customerValidations = Joi.object().keys({
  customerImage:Joi.allow(),
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
    const applicationObjects = await applicationObjectRepository.find();
    const application = result.forEach((customer) =>{
      customer.CustomerRole = applicationObjects.find(x => x.ApplicationObjectId == customer.customerRoleId);
      customer.CustomerType = applicationObjects.find(x => x.ApplicationObjectId == customer.customerTypeId);
    })
    res.locals.results = result;
    next();
  } catch (error) {
    next({ error: { status: HttpStatusCodes.SERVER_ERROR, message: error.message } });
  }
};

const GetCustomerById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await customerRepository.findOne({where: {
      customerId: parseInt(req.query.id.toString(),10),
    }});
    const applicationObjects = await applicationObjectRepository.find();
    result.CustomerRole = applicationObjects.find(x => x.ApplicationObjectId == result.customerRoleId);
    result.CustomerType = applicationObjects.find(x => x.ApplicationObjectId == result.customerTypeId);
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
      customer.customerName = customerDetail.customerName;
      customer.customerDetails = customerDetail.customerDetails;
      customer.contactNumber = customerDetail.contactNumber;
      customer.email = customerDetail.email;
      customer.customerPhotoPath = req.file.filename;
      customer.birthDate = customerDetail.birthDate;
      customer.customerTypeId = customerDetail.customerTypeId;
      customer.isActive = customerDetail.isActive;
      customer.customerRoleId = customerDetail.customerRoleId;
      customer.statusId = Status.Active
      customer.createdBy = 1;
      customer.updatedBy = 1;
      customer.userIpAddress = '';
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

      customer.customerName = customerDetail.customerName;
      customer.customerDetails = customerDetail.customerDetails;
      customer.contactNumber = customerDetail.contactNumber;
      customer.email = customerDetail.email;
      customer.customerPhotoPath = req.file.filename;
      customer.birthDate = customerDetail.birthDate;
      customer.customerTypeId = customerDetail.customerTypeId;
      customer.isActive = customerDetail.isActive;
      customer.customerRoleId = customerDetail.customerRoleId;
      customer.updatedBy = 1;

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

export { GetCustomers, AddCustomers, UpdateCustomers, DeleteCustomers,GetCustomerById };