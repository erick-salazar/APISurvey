import { Min } from "class-validator";
import { Survey } from "src/surveys/entities/survey.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Anwer } from "./anwers.entity";

@Entity('Questions')
export class Question {

    @PrimaryGeneratedColumn()
    questionId: number;

    @Column({
        type: "varchar"
    })
    @Min(10)
    questionName: string

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
        name: "surveyId"
    })
    surveyId:number;

    @ManyToOne(
        ()=>Survey,
        (surveys )=>surveys.questions
    )
    @JoinColumn({ name: "surveyId" })
    questions:Question

    @OneToMany(
        ()=>Anwer,
        (anwer )=>anwer.questionAnwer
    )
    questionAnwer:Anwer[]
}
