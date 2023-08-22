import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { UserWallet } from './entity/user-wallet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserWallet])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
