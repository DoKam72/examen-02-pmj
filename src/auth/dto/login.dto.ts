import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ example: 'pedro123' })
  @IsString()
  username!: string;

    @ApiProperty({ example: '123456' })
  @IsString()
  password!: string;
}