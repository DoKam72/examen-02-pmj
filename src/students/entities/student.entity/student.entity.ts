import { Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../../../users/entities/user.entity/user.entity';
import { Enrollment } from '../../../enrollments/entities/enrollment.entity/enrollment.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => User, (user) => user.student)
  @JoinColumn()
  user!: User;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments!: Enrollment[];
}