import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { ApplicationObjects } from "./ApplicationObjeacts"

@Entity()
export  class Customers {

    @PrimaryGeneratedColumn()
    CustomerId: number

    @Column({ type: "varchar", length: 50 })
    CustomerName: string

    @Column({ type: "varchar", length: 200 })
    CustomerDetails: string

    @Column({ type: "varchar", length: 10 })
    ContactNumber: string

    @Column({ type: "varchar", length: 50 })
    Email: string

    @Column()
    BirthDate: Date

    @Column({ type: "varchar", length: 250, nullable:true })
    CustomerPhotoPath: string

    @Column()
    CustomerTypeId: number

    @ManyToOne(() => ApplicationObjects)
    @JoinColumn({ name: "CustomerTypeId" })
    CustomerType: ApplicationObjects;

    @Column()
    IsActive: boolean

    @Column()
    CustomerRoleId: number

    @ManyToOne(() => ApplicationObjects)
    @JoinColumn({ name: "CustomerRoleId" })
    CustomerRole: ApplicationObjects;

    @Column()
    StatusId: number

    @Column()
    CreatedBy: number

    @CreateDateColumn()
    CreatedAt: Date

    @Column()
    UpdatedBy: number

    @UpdateDateColumn()
    UpdatedAt: Date

    @Column({ type: "varchar", length: 20 })
    UserIpAddress: string
    
}
