import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from "typeorm"
import { VendorTypes } from "./VendorTypes"

@Entity()
export class Vendors {

    @PrimaryGeneratedColumn()
    VendorId: number

    @Column({ type: "varchar", length: 50 })
    VendorName: string

    @Column({ type: "varchar", length: 200 })
    VendorDetail: string

    @Column({ type: "varchar", length: 10 })
    ContactNumber: string

    @Column({ type: "varchar", length: 50 })
    Email: string

    @Column({ type: "varchar", length: 250, nullable:true })
    VendorPhotoPath: string

    @Column()
    VendorTypeId: number

    @ManyToOne(() => VendorTypes)
    @JoinColumn({ name: "VendorTypeId" })
    VendorType: VendorTypes;
    
    @Column()
    IsManufacturer: boolean

    @Column()
    AvailableTill: Date

    @Column()
    IsActive: boolean

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
