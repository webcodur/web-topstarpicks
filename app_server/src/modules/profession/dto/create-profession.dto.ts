import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProfessionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  eng_name?: string;
}