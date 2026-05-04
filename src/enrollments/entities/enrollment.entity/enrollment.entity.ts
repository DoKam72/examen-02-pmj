import { Course } from 'src/courses/entities/course.entity/course.entity';
import { Student } from 'src/students/entities/student.entity/student.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';


@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Student, (student) => student.enrollments)
  student!: Student;

  @ManyToOne(() => Course, (course) => course.enrollments)
  course!: Course;
}