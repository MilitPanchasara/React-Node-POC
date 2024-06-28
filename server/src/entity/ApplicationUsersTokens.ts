import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity()
export  class ApplicationUsersTokens {

    @PrimaryGeneratedColumn()
    ApplicationUsersTokenId: number

    @Column()
    UserId: number

    @Column()
    ClientSecret: string

    @Column()
    AuthToken: string

    @Column()
    AntiForgreyToke: string

    @Column()
    IsActive: boolean

    @Column({ type: "varchar", length: 10 })
    TokenType: string

    @CreateDateColumn()
    CreatedAt: Date

    @Column()
    SessionTime: Date
}
