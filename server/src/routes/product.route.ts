import { Router, Request, Response, NextFunction } from 'express';
import {GetProduct,AddProduct,UpdateProduct,DeleteProduct} from '../controllers/product.controller';
import multer from 'multer';
import Joi from 'joi';


const uploadTemp = multer();

const PostValidations = Joi.object().keys({
	productName: Joi.string().required().min(4).max(50),
	productDetail: Joi.string().required().min(50).max(200),
	price: Joi.number().precision(2).positive().required(),
	quantity: Joi.allow(),
	productCategoryId: Joi.allow(),
	availableTill: Joi.allow(),
	isOwnProduct: Joi.allow()
});


const ProductRoute: Router = Router();

ProductRoute.get("/Product", GetProduct, async (req, res) => {
  res.status(200).send(res.locals.Posts);
});


ProductRoute.post(
  "/Product",
  uploadTemp.single("productImage"),
  AddProduct,
  async (req, res) => {
    res.status(200).send("Post added");
  }
);


ProductRoute.put(
  "/Product",
  uploadTemp.single("productImage"),
  UpdateProduct,
  async (req, res) => {
    res.status(200).send(res.locals.updated_post);
  }
);


ProductRoute.delete("/Product", DeleteProduct, async (req, res) => {
  res.status(200).send(res.locals.postdelete);
});

export default ProductRoute;
