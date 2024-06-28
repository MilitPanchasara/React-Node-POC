import { Request, Response, NextFunction } from 'express';
import { Roles } from '../entity/Roles'; 
import { HttpStatusCodes } from '../enums/error'; 
import { AppDataSource } from '../config/data-source';


const RoleRepository = AppDataSource.getRepository(Roles)

const GetRoles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await RoleRepository.find();
    res.locals.results = result;
    next();
  } catch (error) {
    next({ error: { status: HttpStatusCodes.SERVER_ERROR, message: error.message } });
  }
};

const AddRoles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { Role } = req.body; 
    const data = await RoleRepository.create(Role)
    next();
  } catch (error) {
    next({ error: { status: HttpStatusCodes.SERVER_ERROR, message: error.message } });
  }
};

const UpdateRoles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const  id = parseInt(req.query.id as string, 10); 
    await RoleRepository.update(id,req.body);
    res.locals.UpdatedRole = `Role Id : ${id} Updated Successfully`;
    next();
  } catch (error) {
    next({ error: { status: HttpStatusCodes.SERVER_ERROR, message: error.message } });
  }
};

const DeleteRoles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const  id  = parseInt(req.query.id as string, 10); 
    await RoleRepository.delete(id)
    res.locals.DeletedRoles = `Role Id : ${id} Deleted Successfully`;
    next();
  } catch (error) {
    next({ error: { status: HttpStatusCodes.SERVER_ERROR, message: error.message } });
  }
};

export { GetRoles, AddRoles, UpdateRoles, DeleteRoles };