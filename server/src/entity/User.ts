import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	JoinColumn,
	ManyToOne,
} from "typeorm";
import { Roles } from "./Roles";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	UserId: number;

	@Column({ type: "varchar", length: 50 })
	FirstName: string;

	@Column({ type: "varchar", length: 50 })
	LastName: string;

	@Column({ type: "varchar", length: 50 })
	Email: string;

	@Column()
	Password: string;

	@Column()
	Salt: string;

	@Column()
	RoleId: number;

	@ManyToOne(() => Roles)
	@JoinColumn({ name: "RoleId" })
	Role: Roles;

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
}
