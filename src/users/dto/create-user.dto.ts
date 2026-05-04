import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Pedro' })
  @IsString()
  nombre!: string;

  @ApiProperty({ example: 'pedro123' })
  @IsString()
  username!: string;

  @ApiProperty({ example: '123456' })
  @MinLength(6)
  password!: string;
}