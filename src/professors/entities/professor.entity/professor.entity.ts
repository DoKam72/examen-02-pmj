import { Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../../../users/entities/user.entity/user.entity';
import { Course } from '../../../courses/entities/course.entity/course.entity';

@Entity()
export class Professor {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => User, (user) => user.professor)
  @JoinColumn()
  user!: User;

  @OneToMany(() => Course, (course) => course.professor)
  courses!: Course[];
}