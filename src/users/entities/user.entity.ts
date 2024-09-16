import { Role } from "src/role/entities/role.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";


@Entity('Roles')
export class User {

    @Column({
        type:"varchar",
        unique:true,
        primary:true
    })
    userId:string;

    @Column({
        type:'varchar'
    })
    firstName: string;

    @Column({
        type:'varchar',nullable:true
    })
    secondName?:string;

    @Column({
        type:'varchar'
    })
    lastName: string;

    @Column({
        type:'varchar', nullable:true
    })
    secondLastName?: string;

    @Column({
        type:'varchar'
    })
    password:string;

    @Column({
        type:'varchar',
        default:true
    })
    status:boolean;

    @CreateDateColumn()
    dateCreated: Date

    @Column({
        type:'int',
        name: "roleId"
    })
    roleId:number;

    @ManyToOne(
        ()=>Role,
        (role )=>role.roles, {
            eager:true
        }
    )
    @JoinColumn({ name: "roleId" })
    roles:Role

}