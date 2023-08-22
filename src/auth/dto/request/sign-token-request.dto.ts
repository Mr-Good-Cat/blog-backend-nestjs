import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress } from 'class-validator';

export class SignTokenRequestDto {
  @ApiProperty()
  @IsEthereumAddress()
  wallet: string;
}
