import { Min } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Question } from "./question.entity";
import { AnwerTypes } from "./anwer-types.entity";

@Entity('Anwers')
export class Anwer {

    @PrimaryGeneratedColumn()
    anweresId: number;

    @Column({
        type: "varchar"
    })
    @Min(10)
    anweresName: string
    
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

    @ManyToOne(
        ()=>Question,
        (question )=>question.questionAnwer
    )
    @JoinColumn({ name: "questionId" })
    questionAnwer:Question

    @Column({
        type:'int',
        name: "anweresTypeId"
    })
    anweresTypeId:number;

    @ManyToOne(
        ()=>AnwerTypes,
        (anwerTypes )=>anwerTypes.anwersTypes
    )
    @JoinColumn({ name: "anweresTypeId" })
    anwersTypes:AnwerTypes
}
