import { Request, Response, NextFunction } from "express";
import { HttpStatusCodes } from "../enums/error";
import Joi from "joi";
import multer from "multer";
import { Products } from "../entity/Products";
import { AppDataSource } from "../config/data-source";
import { Status } from "../enums/status";
import { Productcategories } from "../entity/ProductCategories";

const ProductRepository = AppDataSource.getRepository(Products);
const ProductCategories = AppDataSource.getRepository(Productcategories);

const storage = multer.diskStorage({
	destination: function (
		req: Request,
		file: Express.Multer.File,
		cb: Function
	) {
		cb(null, "./Uploads");
	},
	filename: function (req: Request, file: Express.Multer.File, cb: Function) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + "-" + file.originalname);
	},
});

const upload = multer({ storage: multer.memoryStorage() });

const PostValidations = Joi.object().keys({
	productName: Joi.string().required().min(4).max(50),
	productDetail: Joi.string().required().min(50).max(200),
	price: Joi.number().precision(2).positive().required(),
	quantity: Joi.allow(),
	productCategoryId: Joi.allow(),
	availableTill: Joi.allow(),
	isOwnProduct: Joi.allow()
});

const GetProduct = async (req: Request, res: Response, next: NextFunction) => {
	try {
		ProductRepository.find().then(async (allProduct) => {
			var categories = await ProductCategories.find();
			allProduct.forEach((product) =>{
				product.ProductCategory = categories.find(x => x.ProductcategoryId == product.ProductCategoryId)
			})
			res.locals.Posts = allProduct;
			next();
		});
	} catch (error) {
		next({
			error: { status: HttpStatusCodes.SERVER_ERROR, message: error },
		});
	}
};

const AddProduct = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let { error } = PostValidations.validate(req.body);

		if (error) {
			next({
				error: {
					status: HttpStatusCodes.BAD_REQUEST,
					message: error.message,
				},
			});
		} else {
			ProductRepository.save({
				ProductName: req.body.productName,
				ProductDetail: req.body.productDetail,
				ProductImageName: req.file.filename,
				SKU: generateRandomString(10),
				Price: req.body.price,
				Quantity: req.body.quantity,
				ProductCategoryId: req.body.productCategoryId,
				IsOwnProduct: req.body.isOwnProduct,
				AvailableTill: req.body.availableTill,
				StatusId: Status.Active,
				CreatedBy: 1,
				UpdatedBy: 1,
				UserIpAddress: "",
			}).then(() => {
				next();
			});
		}
	} catch (error) {
		next({
			error: { status: HttpStatusCodes.SERVER_ERROR, message: error },
		});
	}
};

const UpdateProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		let { error } = PostValidations.validate(req.body);
		if (error) {
			next({
				error: {
					status: HttpStatusCodes.BAD_REQUEST,
					message: error.message,
				},
			});
		} else {
			const id = req.query.id as any as number;
			var oldProductData = await ProductRepository.findOneBy({ProductId:id})

			var product = new Products();
			product.ProductName =  req.body.productName,
			product.ProductDetail =  req.body.productDetail,
			product.ProductImageName = req.file.filename != null ? req.file.filename : oldProductData.ProductImageName,
			product.SKU = oldProductData.SKU,
			product.Price =  req.body.price,
			product.Quantity =  req.body.quantity,
			product.ProductCategoryId =  req.body.productCategoryId,
			product.IsOwnProduct =  req.body.isOwnProduct,
			product.AvailableTill =  req.body.availableTill,
			product.StatusId =  oldProductData.StatusId,
			product.UpdatedBy =  1,
			product.UserIpAddress =  "",

			ProductRepository.update(id, product);
			res.locals.updated_post = `Product Id:${req.query.id} Updated SuccessFully`;
			next();
		}
	} catch (error) {
		next({
			error: { status: HttpStatusCodes.SERVER_ERROR, message: error },
		});
	}
};

const DeleteProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = parseInt(req.query.id as string, 10);
		ProductRepository.delete(id);
		res.locals.postdelete = `Post Id: ${req.query.id} is deleted successfully`;

		next();
	} catch (error) {
		if (error.errors)
			next({
				error: { status: HttpStatusCodes.SERVER_ERROR, message: error },
			});
	}
};

function generateRandomString(length: number): string {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		);
	}
	return result;
}

export { AddProduct, GetProduct, UpdateProduct, DeleteProduct };
