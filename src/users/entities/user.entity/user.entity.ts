import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Role } from 'src/common/enums/role.enum';
import { Professor } from 'src/professors/entities/professor.entity/professor.entity';
import { Student } from 'src/students/entities/student.entity/student.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ unique: true })
  username!: string;

  @Exclude()
  @Column()
  password!: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role!: Role;

  // Aqui las relaciones son opcionales, un user puede tener asignado un student o un professor, pero no es obligatorio
  @OneToOne(() => Student, (student) => student.user)
  student!: Student;

  @OneToOne(() => Professor, (professor) => professor.user)
  professor!: Professor;
}