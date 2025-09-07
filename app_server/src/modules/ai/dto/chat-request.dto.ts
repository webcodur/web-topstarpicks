import { IsString, IsNotEmpty } from 'class-validator';

export class ChatRequestDto {
  @IsNotEmpty()
  @IsString()
  testText: string;
}