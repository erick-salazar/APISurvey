import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Role')
export class Role {

    @ApiProperty({
        example:1,
        description:'auto incremental INT DB',
        uniqueItems:true
    })
    @PrimaryGeneratedColumn('increment')
    roleId: number;
    
    @Column({
        type:'varchar',
        unique:true
    })
    rolName:string;

    @Column({
    type:'varchar'})
    createBy:string;
    
    @Column({
        type:'datetime'
    })
    @CreateDateColumn()
    createdDate:Date;

    @Column({
        type:'bit',
        default:true
    })
    status:boolean;

    @Column({type:'varchar', nullable:true})
    updatedBy?:string;

    @Column({type:'datetime', nullable:true})
    @UpdateDateColumn()
    updatedDate?:string;

    @OneToMany(
        ()=>User,
        (user)=>user.roles
    )
    roles:User[]

}
