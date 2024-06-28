import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { ApplicationObjects } from "./entity/ApplicationObjeacts";
import { ApplicationObjectTypes } from "./entity/ApplicationObjectTypes";
import { ApplicationUsersTokens } from "./entity/ApplicationUsersTokens";
import { Customers } from "./entity/Customers";
import { Discounts } from "./entity/Discount";
import { Modules } from "./entity/Modules";
import { Photos } from "./entity/Photos";
import { Productcategories } from "./entity/ProductCategories";
import { ProductImages } from "./entity/ProductImages";
import { Products } from "./entity/Products";
import { Roles } from "./entity/Roles";
import { RoleModulePermissions } from "./entity/RolesModulePermissions";
import { Vendors } from "./entity/Vendors";
import { VendorTypes } from "./entity/VendorTypes";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: "10.10.10.23",
	port: 5432,
	username: "bhaumik_vora",
	password: "deep70",
	database: "bhaumik_vora",
	synchronize: true,
	entities: [
		User,
		ApplicationObjects,
		ApplicationObjectTypes,
		ApplicationUsersTokens,
		Customers,
		Discounts,
		Modules,
		Photos,
		Productcategories,
		ProductImages,
		Products,
		Roles,
		RoleModulePermissions,
		User,
		Vendors,
		VendorTypes,
	],
	migrations: [],
	subscribers: [],
});
