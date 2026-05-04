import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
    @ApiBody({ type: RegisterDto })
    @ApiResponse({ status: 201, description: 'Usuario creado' })
    @ApiResponse({ status: 400, description: 'Error en datos' })
    register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
}

  @Post('login')
    @ApiBody({ type: LoginDto })
    @ApiResponse({ status: 200, description: 'Login exitoso, retorna token JWT' })
    @ApiResponse({ status: 401, description: 'Credenciales invalidas' })
    login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
}
}