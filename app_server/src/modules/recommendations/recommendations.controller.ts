import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  Query, 
  HttpException, 
  HttpStatus,
  ParseIntPipe
} from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { UpdateRecommendationDto } from './dto/update-recommendation.dto';
import { RecommendationQueryDto } from './dto/recommendation-query.dto';

@Controller('recommendations')
export class RecommendationsController {
  constructor(private readonly recommendationsService: RecommendationsService) {}

  /**
   * 특정 인물의 특정 타입 컨텐츠 추천 목록 조회
   * GET /api/recommendations
   */
  @Get()
  async findByCelebrityAndContent(@Query() queryParams: RecommendationQueryDto) {
    const { celebrity_name, content_name } = queryParams;

    if (!celebrity_name || !content_name) {
      throw new HttpException(
        '인물 이름과 컨텐츠 타입을 모두 제공해야 합니다.',
        HttpStatus.BAD_REQUEST
      );
    }

    const data = await this.recommendationsService.findByCelebrityAndContent(queryParams);
    return { message: 'success', data };
  }

  /**
   * 모든 추천 정보 조회 (관리자용)
   * GET /api/recommendations/all
   */
  @Get('all')
  async findAll() {
    const data = await this.recommendationsService.findAll();
    return { message: 'success', data };
  }

  /**
   * 새 추천 정보 추가
   * POST /api/recommendations
   */
  @Post()
  async create(@Body() createRecommendationDto: CreateRecommendationDto) {
    const result = await this.recommendationsService.create(createRecommendationDto);
    return { message: 'success', data: { id: result.lastID } };
  }

  /**
   * 추천 정보 수정
   * PUT /api/recommendations/:id
   */
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRecommendationDto: UpdateRecommendationDto
  ) {
    const result = await this.recommendationsService.update(id, updateRecommendationDto);
    return { message: 'success', data: { changes: result.changes } };
  }

  /**
   * 추천 정보 삭제
   * DELETE /api/recommendations/:id
   */
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.recommendationsService.remove(id);
    return { message: 'success', data: { changes: result.changes } };
  }
}