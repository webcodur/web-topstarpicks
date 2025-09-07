import { IsString, IsOptional } from 'class-validator';

export class RecommendationQueryDto {
  @IsOptional()
  @IsString()
  celebrity_name?: string;

  @IsOptional()
  @IsString()
  content_name?: string;
}