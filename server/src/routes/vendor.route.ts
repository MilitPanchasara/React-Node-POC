import { Router, Request, Response } from "express";
import {
	GetVendors,
	AddVendors,
	UpdateVendors,
	DeleteVendors,
} from "../controllers/vendor.controller"; 
import { Roles } from "../entity/Roles";
import multer from "multer";

const vendorRoute: Router = Router();

const storage = multer.diskStorage({
	destination: function (
		req: Request,
		file: Express.Multer.File,
		cb: Function
	) {
		cb(null, "./storage/UploadVendorPhoto");
	},
	filename: function (req: Request, file: Express.Multer.File, cb: Function) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + "-" + file.originalname);
	},
});

const upload = multer({ storage: storage });

// Basic CRUD Routing

vendorRoute.get("/Vendor", GetVendors, async (req: Request, res: Response) => {
	res.status(200).send(res.locals.results);
});

vendorRoute.post("/Vendor", upload.single("vendorPhoto"),AddVendors, async (req: Request, res: Response) => {
	res.status(200).send(res.locals.results);
});

vendorRoute.put("/Vendor",upload.single("vendorPhoto"), UpdateVendors, async (req: Request, res: Response) => {
	res.status(200).send(res.locals.results);
});

vendorRoute.delete(
	"/Vendor",
	DeleteVendors,
	async (req: Request, res: Response) => {
		res.status(200).send(res.locals.DeletedRoles);
	}
);

export default vendorRoute;
