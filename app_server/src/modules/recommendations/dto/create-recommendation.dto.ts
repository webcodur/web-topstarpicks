import { IsString, IsOptional, IsNumber, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateRecommendationDto {
  @IsNotEmpty()
  @IsNumber()
  celebrity_id: number;

  @IsNotEmpty()
  @IsNumber()
  content_id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  creator?: string;

  @IsOptional()
  @IsString()
  release_date?: string;

  @IsOptional()
  @IsString()
  recommendation_text?: string;

  @IsOptional()
  @IsString()
  recommendation_source?: string;

  @IsOptional()
  @IsString()
  img_link?: string;

  @IsOptional()
  @IsString()
  affiliate_link?: string;

  @IsOptional()
  @IsString()
  mediaDescription?: string;
}