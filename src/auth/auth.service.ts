import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { SignTokenRequestDto } from './dto/request/sign-token-request.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from '../user/user.service';
import { SignRequestDto } from './dto/request/sign-request.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async getSignToken(dto: SignTokenRequestDto) {
    const token = uuidv4();

    let user = await this.userService.findByWallet(dto.wallet);
    if (!user) {
      user = await this.userService.create(dto.wallet);
    }

    await this.userService.updateSignToken(user.id, token);

    return this.getMessageForSign(token);
  }

  public async signIn(dto: SignRequestDto) {
    const { signature, wallet } = dto;

    const user = await this.userService.findByWallet(wallet);

    if (!user) throw new ForbiddenException();

    const addr = ethers.utils.verifyMessage(
      this.getMessageForSign(user.signToken),
      signature,
    );

    if (wallet.toLowerCase() === addr.toLowerCase()) {
      // reset sign token
      await this.userService.updateSignToken(user.id, uuidv4());

      const tokens = await this.getTokens(user.id, wallet, 'ROLE_USER');
      await this.userService.updateRefreshToken(user.id, tokens.refreshToken);

      return tokens;
    }

    throw new ForbiddenException();
  }

  public async logout(userId: number) {
    return this.userService.updateRefreshToken(userId, null);
  }

  public async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.userService.findById(userId);

    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = user.refreshToken === refreshToken;
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const token = <any>this.jwtService.decode(refreshToken);
    const tokens = await this.getTokens(user.id, token.wallet, 'ROLE_USER');
    await this.userService.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  private async getTokens(userId: number, wallet: string, role: string) {
    const payload = {
      sub: userId,
      wallet,
      role,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('jwtSecret'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('jwtSecret'),
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private getMessageForSign(token: string) {
    return 'I am signing my one-time nonce: ' + token;
  }
}
