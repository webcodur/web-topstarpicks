import { IsOptional, IsString } from 'class-validator';

export class CelebrityQueryDto {
  @IsOptional()
  @IsString()
  profession?: string;

  @IsOptional()
  @IsString()
  era?: string;

  @IsOptional()
  @IsString()
  menuType?: string;

  @IsOptional()
  @IsString()
  contentName?: string;
}

export class CelebritySearchDto {
  @IsString()
  query: string;
}

export class CelebrityGptInfoDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}