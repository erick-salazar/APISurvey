import { Min } from "class-validator";
import { Question } from "src/questions/entities/question.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Surveys')
export class Survey {

    @PrimaryGeneratedColumn()
    surveyId: number;

    @Column({
        type: "varchar",
        generated: 'uuid'
    })
    surveyGuid: string;

    @Column({
        type: "varchar"
    })
    @Min(10)
    surveyName: string

    @Column({
        type: "varchar"
    })
    @Min(10)
    surveyDescription: string

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

    @OneToMany(
        ()=>Question,
        (question)=>question.questions
    )
    questions:Question[]

}
