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
import { CelebritiesService } from './celebrities.service';
import { CreateCelebrityDto } from './dto/create-celebrity.dto';
import { UpdateCelebrityDto } from './dto/update-celebrity.dto';
import { CelebrityQueryDto, CelebritySearchDto, CelebrityGptInfoDto } from './dto/celebrity-query.dto';

@Controller('celebrities')
export class CelebritiesController {
  constructor(private readonly celebritiesService: CelebritiesService) {}

  /**
   * 인물명으로 단일 인물 정보 조회
   * GET /api/celebrities/name?name={인물명}
   */
  @Get('name')
  async findByName(@Query('name') name: string) {
    if (!name) {
      throw new HttpException('인물 이름을 제공해야 합니다.', HttpStatus.BAD_REQUEST);
    }

    const data = await this.celebritiesService.findByName(name);
    return { message: 'success', data };
  }

  /**
   * 유명인사 필터링 조회
   * GET /api/celebrities
   */
  @Get()
  async findAll(@Query() queryParams: CelebrityQueryDto) {
    const data = await this.celebritiesService.findAll(queryParams);
    return { message: 'success', data };
  }

  /**
   * 직군별 인원수 조회
   * GET /api/celebrities/profession-numbers
   */
  @Get('profession-numbers')
  async getProfessionNumbers() {
    const data = await this.celebritiesService.getProfessionNumbers();
    return { message: 'success', data };
  }

  /**
   * 영향력 지수 조회
   * GET /api/celebrities/influenceIndex/:testName
   */
  @Get('influenceIndex/:testName')
  async getInfluenceIndex(@Param('testName') testName: string) {
    const data = await this.celebritiesService.getInfluenceIndex(testName);
    
    if (!data) {
      throw new HttpException('Influence index not found', HttpStatus.NOT_FOUND);
    }

    return { message: 'success', data };
  }

  /**
   * 모든 Celebrity 조회 (Admin 용)
   * GET /api/celebrities/all
   */
  @Get('all')
  async findAllForAdmin() {
    const data = await this.celebritiesService.findAllForAdmin();
    return { message: 'success', data };
  }

  /**
   * 이름으로 유명인사 검색 (부분 일치)
   * GET /api/celebrities/search
   */
  @Get('search')
  async search(@Query('query') query: string) {
    if (!query) {
      throw new HttpException('검색어를 입력해주세요.', HttpStatus.BAD_REQUEST);
    }

    const data = await this.celebritiesService.search(query);
    return { message: 'success', data };
  }

  /**
   * ID로 유명인사 정보 조회
   * GET /api/celebrities/detail/:id
   */
  @Get('detail/:id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.celebritiesService.findById(id);
    
    if (!data) {
      throw new HttpException('Celebrity not found', HttpStatus.NOT_FOUND);
    }

    return { message: 'success', data };
  }

  /**
   * 새 Celebrity 추가 (Admin 용)
   * POST /api/celebrities
   */
  @Post()
  async create(@Body() createCelebrityDto: CreateCelebrityDto) {
    try {
      const result = await this.celebritiesService.create(createCelebrityDto);
      return {
        message: 'success',
        data: { id: result.lastID }
      };
    } catch (error) {
      console.error('Error creating celebrity:', error);
      throw new HttpException(
        '유명인사 생성 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Celebrity 정보 수정 (Admin 용)
   * PUT /api/celebrities/:id
   */
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCelebrityDto: UpdateCelebrityDto
  ) {
    const result = await this.celebritiesService.update(id, updateCelebrityDto);
    return { message: 'success', data: { changes: result.changes } };
  }

  /**
   * Celebrity 삭제 (Admin 용)
   * DELETE /api/celebrities/:id
   */
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.celebritiesService.remove(id);
    return { message: 'success', data: { changes: result.changes } };
  }

  /**
   * GPT를 통한 유명인사 정보 조회
   * POST /api/celebrities/gpt-info
   */
  @Post('gpt-info')
  async getGptInfo(@Body() celebrityGptInfoDto: CelebrityGptInfoDto) {
    try {
      const { name, description } = celebrityGptInfoDto;

      // TODO: Implement OpenAI service integration
      // const celebrityInfo = await this.openaiService.getCelebrityInfoByGPT(name, description);

      // Placeholder response for now
      const validatedResponse = {
        name: name,
        profession_kor: '',
        gender: '',
        nationality: '',
        birth_date: '',
        death_date: '',
        biography: '',
        is_real: false,
        is_legend: false,
      };

      return { message: 'success', data: validatedResponse };
    } catch (error) {
      console.error('Error in /gpt-info:', error);
      throw new HttpException(
        'GPT 정보 조회 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}