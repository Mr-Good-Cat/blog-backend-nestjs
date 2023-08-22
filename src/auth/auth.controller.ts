import { Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignTokenRequestDto } from './dto/request/sign-token-request.dto';
import { SignRequestDto } from './dto/request/sign-request.dto';
import { Request } from 'express';
import { AccessTokenGuard } from './guard/access-token.guard';
import { RefreshTokenGuard } from './guard/refresh-token.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Get('sign-token')
  getSignToken(@Query() dto: SignTokenRequestDto) {
    return this.service.getSignToken(dto);
  }

  @Post('signin')
  signIn(@Query() dto: SignRequestDto) {
    return this.service.signIn(dto);
  }

  @Post('logout')
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  logout(@Req() req: Request) {
    const userId = req.user['sub'];
    return this.service.logout(+userId);
  }

  @ApiBearerAuth()
  @Post('refresh-token')
  @UseGuards(RefreshTokenGuard)
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.service.refreshTokens(+userId, refreshToken);
  }
}
