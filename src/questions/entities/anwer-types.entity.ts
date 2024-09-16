import { Min } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Question } from "./question.entity";
import { Anwer } from "./anwers.entity";

@Entity()
export class AnwerTypes {

    @PrimaryGeneratedColumn()
    anweresTypeId: number;

    @Column({
        type: "varchar"
    })
    @Min(10)
    anweresTypeName: string
    
    @Column({
        type: 'varchar'
    })
    createBy: string;

    @Column({
        type: 'datetime'
    })
    @CreateDateColumn()
    createdDate: Date;

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

    @Column({
        type:'int',
        name: "questionId"
    })
    questionId:number;

    @OneToOne(
        ()=>Anwer,
        (anwer )=>anwer.anwersTypes
    )
    @JoinColumn({ name: "questionId" })
    anwersTypes:Anwer[]
}
