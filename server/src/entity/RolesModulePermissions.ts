import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { Roles } from "./Roles";
import { Module } from "module";
import { Modules } from "./Modules";

@Entity()
export class RoleModulePermissions {

    @PrimaryGeneratedColumn()
    RoleModulePermissionId: number
   
    @Column()
    RoleId: string

    @ManyToOne(() => Roles)
    @JoinColumn({ name: "RoleId" })
    Role: Roles;


    @Column()
    ModuleId: string

    @ManyToOne(() => Modules)
    @JoinColumn({ name: "ModuleId" })
    Module: Modules;


    @Column()
    IsAdd: boolean

    @Column()
    IsEdit: boolean

    @Column()
    IsView: boolean

    @Column()
    IsExport: boolean

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
}
