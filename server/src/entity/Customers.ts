import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn, BeforeInsert, BeforeUpdate } from "typeorm"
import { ApplicationObjects } from "./ApplicationObjeacts"

@Entity()
export  class Customers {

    @PrimaryGeneratedColumn({ name: "CustomerId"})
    customerId: number

    @Column({ type: "varchar", length: 50, name: "CustomerName" })
    customerName: string

    @Column({ type: "varchar", length: 200,name:"CustomerDetails" })
    customerDetails: string

    @Column({ type: "varchar", length: 10,name:"ContactNumber" })
    contactNumber: string

    @Column({ type: "varchar", length: 50,name:"Email" })
    email: string

    @Column({ type: "date", nullable: true, name:"BirthDate"})
    birthDate: Date

    @Column({ type: "varchar", length: 250, nullable:true,name:"CustomerPhotoPath" })
    customerPhotoPath: string

    @Column({name:"CustomerTypeId"})
    customerTypeId: number

    @ManyToOne(() => ApplicationObjects)
    @JoinColumn({ name: "CustomerTypeId" })
    CustomerType: ApplicationObjects;

    @Column({name:"IsActive"})
    isActive: boolean

    @Column({name:"CustomerRoleId"})
    customerRoleId: number

    @ManyToOne(() => ApplicationObjects)
    @JoinColumn({ name: "CustomerRoleId" })
    CustomerRole: ApplicationObjects;

    @Column({name:"StatusId"})
    statusId: number

    @Column({name:"CreatedBy"})
    createdBy: number

    @CreateDateColumn({name:"CreatedAt"})
    createdAt: Date

    @Column({name:"UpdatedBy"})
    updatedBy: number

    @UpdateDateColumn({name:"UpdatedAt"})
    updatedAt: Date

    @Column({ type: "varchar", length: 20,name:"UserIpAddress" })
    userIpAddress: string

}

