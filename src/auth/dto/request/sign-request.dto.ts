import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress, IsString } from 'class-validator';

export class SignRequestDto {
  @ApiProperty()
  @IsEthereumAddress()
  readonly wallet: string;

  @ApiProperty()
  @IsString()
  readonly signature: string;
}
