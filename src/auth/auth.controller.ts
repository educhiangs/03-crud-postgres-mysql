import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register-dto.dto';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { Role } from '../common/enums/role.enum';
import { Auth } from './decorators/auth.decorator';
import { activeUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // @Get('profile')
  // @Roles(Role.USER)
  // @UseGuards(AuthGuard, RolesGuard)
  // profile(
  //   @Req()
  //   req: RequestWithUser,
  // ) {
  //   return this.authService.profile(req.user);
  // }

  @Get('profile')
  @Auth(Role.USER)
  profile(@activeUser() user: UserActiveInterface) {
    return this.authService.profile(user);
  }
}
