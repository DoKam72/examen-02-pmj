import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
   @ApiProperty({ example: 'Pedro' })
  nombre!: string;

  @IsString()
   @ApiProperty({ example: 'pedro123' })
  username!: string;

  @IsString()
  @MinLength(6)
   @ApiProperty({ example: '123456' })
  password!: string;
}