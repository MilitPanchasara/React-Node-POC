import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	JoinColumn,
	ManyToOne,
} from "typeorm";
import { Productcategories } from "./ProductCategories";

@Entity()
export class Products {
	@PrimaryGeneratedColumn()
	ProductId: number;

	@Column({ type: "varchar", length: 50 })
	ProductName: string;

	@Column({ type: "varchar", length: 200 })
	ProductDetail: string;

	@Column({ nullable: true })
	ProductImageName: string;

	@Column({ type: "varchar", length: 50 })
	SKU: string;

	@Column({ type: "decimal" })
	Price: number;

	@Column()
	Quantity: number;

	@Column()
	ProductCategoryId: number;

	@ManyToOne(() => Productcategories)
	@JoinColumn({ name: "ProductCategoryId" })
	ProductCategory: Productcategories;

	@Column()
	IsOwnProduct: boolean;

	@Column()
	AvailableTill: Date;

	@Column()
	StatusId: number;

	@Column()
	CreatedBy: number;

	@CreateDateColumn()
	CreatedAt: Date;

	@Column()
	UpdatedBy: number;

	@UpdateDateColumn()
	UpdatedAt: Date;

	@Column({ type: "varchar", length: 20 })
	UserIpAddress: string;
}
