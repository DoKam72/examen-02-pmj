import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { UsersService } from './users.service';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';


@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
  @UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {

    constructor(private usersService: UsersService) {}

    // GET USERS
    @Get()
    @ApiResponse({ status: 200, description: 'Lista de usuarios' })
    @ApiResponse({ status: 403, description: 'Forbidden, acceso denegado' })
    getUsers(@Request() req) {
        if (req.user.role === Role.USER) {
            return this.usersService.findOne(req.user.id);
        }
        return this.usersService.findAll();
    }
    // CREATE USERS
    @Post()
    @Roles(Role.DEVELOPER)
    @ApiBody({ type: CreateUserDto })
    createUser(@Body() body: CreateUserDto) {
        return this.usersService.create(body);
    }

    // UPDATE USER
    @ApiBody({ type: CreateUserDto })
    @Patch(':id')
    @Roles(Role.DEVELOPER)
    updateUser(@Param('id') id: string, @Body() body: CreateUserDto) {
        return this.usersService.update(+id, body);
  }

  // DELETE USER
    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Usuario eliminado' })
    @ApiResponse({ status: 403, description: 'Solo ADMIN' })
    @Roles(Role.ADMIN)
    deleteUser(@Param('id') id: string) {
        return this.usersService.remove(+id);
  }

  // MAKE ADMIN
    @Patch(':id/make-admin')
    @Roles(Role.ADMIN)
    makeAdmin(@Param('id') id: string) {
        return this.usersService.makeAdmin(+id);
  }
}