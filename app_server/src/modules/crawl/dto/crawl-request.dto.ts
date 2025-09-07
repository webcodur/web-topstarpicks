import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CrawlBooksDto {
  @IsNotEmpty()
  @IsString()
  celebrity_name: string;

  @IsOptional()
  @IsString()
  additional_params?: string;
}