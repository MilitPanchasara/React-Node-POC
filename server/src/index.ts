import dotenv from "dotenv";
import path from "path";
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import CustomerRoute from "./routes/customer.route"; // Adjust this path based on your project structure
import discountRoute from "./routes/discount.route"; // Adjust this path based on your project structure
import photoRoute from "./routes/photo.route";
import RoleRoute from "./routes/roles.route"; // Adjust this path based on your project structure
import UserRoute from "./routes/user.route"; // Adjust this path based on your project structure
import ProductRoute from "./routes/product.route";
import vendorRoute from "./routes/vendor.route";
// import PostRouter from './routes/post.route';  // Adjust this path based on your project structure
import morgan from "morgan";
import { AppDataSource } from "./config/data-source";

dotenv.config();

const app = express();

// Middleware
app.use(
	cors({
		credentials: true,
		origin: "http://localhost:3000",
	}),
	cookieParser(),
	bodyParser.json(),
	morgan("dev")
);

app.use(UserRoute);
app.use(ProductRoute);
app.use(RoleRoute);
app.use(vendorRoute);
app.use(CustomerRoute);
app.use(discountRoute);
app.use(photoRoute);

app.use("*", (req: Request, res: Response) => {
	res.status(404).json({ message: "Invalid route!" });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
	if (error.error && error.error.message) {
		res.status(error.error.status || 500).send({
			message: error.error.message,
		});
	} else {
		res.status(error.status || 500).send({
			message: error.Message || error.message,
		});
	}
});

AppDataSource.initialize()
	.then(async () => {
		console.log(
			"Here you can setup and run express / fastify / any other framework."
		);
	})
	.catch((error) => console.log(error));

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
	console.log(`Running on port ${PORT}`);
});
