import { Enrollment } from 'src/enrollments/entities/enrollment.entity/enrollment.entity';
import { Professor } from 'src/professors/entities/professor.entity/professor.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';


@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @ManyToOne(() => Professor, (professor) => professor.courses)
  professor!: Professor;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments!: Enrollment[];
}