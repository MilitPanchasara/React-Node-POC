import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
} from "typeorm";
import { ApplicationObjectTypes } from "./ApplicationObjectTypes";

@Entity()
export  class ApplicationObjects {
	@PrimaryGeneratedColumn()
	ApplicationObjectId: number;

	@Column()
	ApplicationObjectTypeId: number;

	@ManyToOne(() => ApplicationObjectTypes)
	@JoinColumn({ name: "ApplicationObjectTypeId" })
	applicationObjectType: ApplicationObjectTypes;

	@Column({ type: "varchar", length: 200 })
	Key: string;

	@Column({ type: "varchar", length: 200 })
	Value: string;
}
