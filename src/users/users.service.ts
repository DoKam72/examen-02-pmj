import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity/user.entity';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

    async onModuleInit() {
        await this.createInitialUsers();
    }

    async createInitialUsers() {
    const users = [
      {
        nombre: 'Admin',
        username: 'admin',
        password: 'admin123',
        role: Role.ADMIN,
      },
      {
        nombre: 'Developer',
        username: 'dev',
        password: 'dev123',
        role: Role.DEVELOPER,
      },
      {
        nombre: 'User',
        username: 'user',
        password: 'user123',
        role: Role.USER,
      },
    ];

    for (const u of users) {
      const exists = await this.userRepository.findOne({
        where: { username: u.username },
      });

      if (!exists) {
        const hashed = await bcrypt.hash(u.password, 10);

        await this.userRepository.save({
          nombre: u.nombre,
          username: u.username,
          password: hashed,
          role: u.role,
        });

        console.log(`Usuario creado: ${u.username}`);
      }
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  create(data: Partial<User>) {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  update(id: number, data: Partial<User>) {
    return this.userRepository.update(id, data);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  makeAdmin(id: number) {
    return this.userRepository.update(id, {
      role: Role.ADMIN,
    });
  }
}

