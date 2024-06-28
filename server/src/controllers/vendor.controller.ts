import { Request, Response, NextFunction } from 'express';
import { HttpStatusCodes } from '../enums/error';
import { AppDataSource } from '../config/data-source';
import { Vendors } from '../entity/Vendors';
import Joi from 'joi';
import { Status } from '../enums/status';
import { VendorTypes } from '../entity/VendorTypes';

const VendorsRepository = AppDataSource.getRepository(Vendors)
const VendorTypeRepository = AppDataSource.getRepository(VendorTypes)

const VandorValidations = Joi.object().keys({
  vendorName: Joi.string().required().min(4).max(50),
  vendorDetail: Joi.string().required().min(50).max(200),
  contactDetails: Joi.string()
    .required()
    .min(10)
    .max(10)
    .pattern(/^[6-9]{1}[0-9]{9}$/),
  email: Joi.string().required().email(),
  vendorTypeId: Joi.allow(),
  isManufacturer: Joi.allow(),
  availableTill:Joi.allow()
});


const GetVendors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const vandorType = await VendorTypeRepository.find();
    const result = await VendorsRepository.find();
    result.forEach((vandor) =>{
      vandor.VendorType = vandorType.find(x => x.VendorTypeId == vandor.VendorTypeId)
    })
    res.locals.results = result;
    next();
  } catch (error) {
    next({ error: { status: HttpStatusCodes.SERVER_ERROR, message: error.message } });
  }
};

const AddVendors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { error } = VandorValidations.validate(req.body);

    if(error){
      next({
				error: {
					status: HttpStatusCodes.BAD_REQUEST,
					message: error.message,
				},
			});
    }
    else{
        const Vendor = new Vendors();
        Vendor.VendorName = req.body.vendorName
        Vendor.VendorDetail = req.body.vendorDetail
        Vendor.ContactNumber = req.body.contactDetails,
        Vendor.Email = req.body.email,
        Vendor.VendorPhotoPath = req.file.filename,
        Vendor.VendorTypeId = req.body.vendorTypeId,
        Vendor.IsManufacturer = req.body.isManufacturer,
        Vendor.AvailableTill = req.body.availableTill,
        Vendor.StatusId = Status.Active,
        Vendor.IsActive = true,
        Vendor.CreatedBy = 1,
        Vendor.UpdatedBy = 1,
        Vendor.UserIpAddress = ""

      const data = await VendorsRepository.save(Vendor).then(() =>{
        res.locals.results = `Vendor Added SuccessFully`;
        next();
      });
     
    }
  } catch (error) {
    next({ error: { status: HttpStatusCodes.SERVER_ERROR, message: error.message } });
  }
};

const UpdateVendors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { error } = VandorValidations.validate(req.body);
		if (error) {
			next({
				error: {
					status: HttpStatusCodes.BAD_REQUEST,
					message: error.message,
				},
			});
		} else {
			const id = req.query.id as any as number;
			var oldVendorData = await VendorsRepository.findOneBy({VendorId:id})

			const Vendor = new Vendors();
			Vendor.VendorName = req.body.vendorName
      Vendor.VendorDetail = req.body.vendorDetail
      Vendor.ContactNumber = req.body.contactNumber,
      Vendor.Email = req.body.Email,
      Vendor.VendorPhotoPath = req.file?.filename != null ? req.file.filename : oldVendorData.VendorPhotoPath,
      Vendor.VendorTypeId = req.body.vendorTypeId,
      Vendor.IsManufacturer = req.body.isManufacturer,
      Vendor.AvailableTill = req.body.availableTill,
      Vendor.IsActive = true,
      Vendor.CreatedBy = 1,
      Vendor.UpdatedBy = 1

			VendorsRepository.update(id, Vendor);
			res.locals.results = `Vendor Id:${req.query.id} Updated SuccessFully`;
			next();
		}
  } catch (error) {
    next({ error: { status: HttpStatusCodes.SERVER_ERROR, message: error.message } });
  }
};

const DeleteVendors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.query.id as string, 10);
    await VendorsRepository.delete(id)
    res.locals.DeletedRoles = `Vendor Id : ${id} Deleted Successfully`;
    next();
  } catch (error) {
    next({ error: { status: HttpStatusCodes.SERVER_ERROR, message: error.message } });
  }
};

export { GetVendors, AddVendors, UpdateVendors, DeleteVendors };