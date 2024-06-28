import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import { User } from "../entity/User";
import { HttpStatusCodes } from "../enums/error";
import { AppDataSource } from "../config/data-source";
import { Status } from "../enums/status";
import { Roles } from "../entity/Roles";

const userRepository = AppDataSource.getRepository(User);
const roleRepository = AppDataSource.getRepository(Roles);

const UserDataValidation = Joi.object({
	firstName: Joi.string().required().min(2).max(50),
	lastName: Joi.string().required().min(2).max(50),
	email: Joi.string().required().email(),
	roleId: Joi.number().required(),
	password: Joi.string().required().min(6).max(16),
});

const GetUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const result = await userRepository.find();
		const roles = await roleRepository.find();
		result.forEach((user) =>{
			user.Role = roles.find(x => x.RoleId == user.RoleId)
		})
		res.locals.results = result;
		next();
	} catch (error) {
		next({
			error: {
				status: HttpStatusCodes.SERVER_ERROR,
				message: error.message,
			},
		});
	}
};

const getUserByEmail = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = await userRepository.findOne({
			where: {
				Email: req.body.email,
			},
		});
		if (!user) {
			return res
				.status(HttpStatusCodes.UNAUTHORIZED)
				.send({ message: "User Does Not Exist" });
		}

		const passwordValid = await bcrypt.compare(
			req.body.password,
			user.Password
		);
		if (!passwordValid) {
			return res
				.status(HttpStatusCodes.UNAUTHORIZED)
				.send({ message: "Invalid Username or password" });
		}
    console.log(user);
		res.locals.User = user;
		next();
	} catch (error) {
		next({
			error: {
				status: HttpStatusCodes.SERVER_ERROR,
				message: error.message,
			},
		});
	}
};

const AddUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { error } = UserDataValidation.validate(req.body);
		const ExistUser = await userRepository.findOne({
			where: {
				Email: req.body.email,
			},
		});

		if (error) {
			next({
				error: {
					status: HttpStatusCodes.BAD_REQUEST,
					message: error.message,
				},
			});
		} else if (ExistUser) {
			next({
				status: HttpStatusCodes.SERVER_ERROR,
				message: "This user is already registered please login",
			});
		} else {
			const hashedPassword = await bcrypt.hash(req.body.password, 10);

			console.log(hashedPassword);
			const newUser = await userRepository
				.save({
					FirstName: req.body.firstName,
					LastName: req.body.lastName,
					Email: req.body.email,
					Password: hashedPassword,
					Salt: "10",
					RoleId: req.body.roleId,
					StatusId: Status.Active,
					CreatedBy: 0,
					UpdatedBy: 0,
				})
				.then(() => {
					res.locals.user = newUser;
					console.log(userRepository.find());

					res.locals.SignupStatus = {
						isRegistered: true,
						message: "You are registered successfully please login",
					};
					next();
				});
		}
	} catch (error) {
		next({ status: HttpStatusCodes.SERVER_ERROR, message: error.message });
	}
};

export { GetUsers, getUserByEmail, AddUser };
