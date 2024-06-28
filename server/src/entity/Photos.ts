import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { ApplicationObjects } from "./ApplicationObjeacts"

@Entity()
export class Photos {

    @PrimaryGeneratedColumn()
    PhotoId: number

    @Column({ type: "varchar", length: 50 })
    PhotoName: string

    @Column({ type: "varchar", length: 200 })
    PhotoDescription: string

    @Column({ type: "varchar", length: 250 })
    PhotoPath: string

    @Column()
    DownloadedFromId: number

    @ManyToOne(() => ApplicationObjects)
    @JoinColumn({ name: "DownloadedFromId" })
    DiscountCategory: ApplicationObjects;

    @Column()
    IsOwnPhoto: boolean

    @Column()
    UplodedOn: Date

    @Column()
    SequenceNumber: number

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
