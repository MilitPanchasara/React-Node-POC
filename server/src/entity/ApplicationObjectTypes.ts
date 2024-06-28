import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export  class ApplicationObjectTypes {
	@PrimaryGeneratedColumn()
	ApplicationObjectTypeId: number;

	@Column({ type: "varchar", length: 50 })
	ApplicationObjectTypeName: string;

	@Column({ type: "varchar", length: 500 })
	Description: string;
}
