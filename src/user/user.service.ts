import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserWallet } from './entity/user-wallet.entity';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    @InjectRepository(UserWallet)
    private readonly userWalletRepository: Repository<UserWallet>,
  ) {}

  public findByWallet(wallet: string) {
    return this.repository.findOne({
      where: { wallets: { address: wallet.toLowerCase() } },
    });
  }

  public async create(wallet: string) {
    const user = new User();
    await this.repository.save(user);

    try {
      const userWallet = new UserWallet();
      userWallet.address = wallet.toLowerCase();
      userWallet.user = <any>user.id;

      await this.userWalletRepository.save(userWallet);

      return user;
    } catch (e) {
      this.logger.error(new Error(e).stack);
      await this.repository.remove(user);
    }

    return null;
  }

  public updateSignToken(id: number, token: any) {
    return this.repository.update({ id }, { signToken: token });
  }

  public updateRefreshToken(id: number, refreshToken: string) {
    return this.repository.update({ id }, { refreshToken });
  }

  async findById(userId: number) {
    return this.repository.findOne({
      where: {
        id: userId,
      },
    });
  }

  findAddressById(id: number): Promise<User | null> {
    return this.repository.findOne({
      where: {
        id: id,
      },
      relations: ['wallets'],
    });
  }
}
