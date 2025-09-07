import { Controller, Get } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  /**
   * 활용 가능한 컨텐츠 종류 조회
   * GET /api/content
   */
  @Get()
  async findAll() {
    const data = await this.contentService.findAll();
    return { message: 'success', data };
  }
}