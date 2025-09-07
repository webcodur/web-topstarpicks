import { IsString, IsOptional, IsNumber, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateCelebrityDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  prename?: string;

  @IsOptional()
  @IsString()
  postname?: string;

  @IsNotEmpty()
  @IsNumber()
  profession_id: number;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  nationality?: string;

  @IsOptional()
  @IsString()
  birth_date?: string;

  @IsOptional()
  @IsString()
  death_date?: string;

  @IsOptional()
  @IsString()
  biography?: string;

  @IsOptional()
  @IsString()
  img_link?: string;

  @IsOptional()
  @IsString()
  vid_link?: string;

  @IsOptional()
  @IsString()
  book_story?: string;

  @IsOptional()
  @IsString()
  quotes?: string;

  @IsOptional()
  @IsBoolean()
  is_real?: boolean;

  @IsOptional()
  @IsBoolean()
  is_legend?: boolean;
}