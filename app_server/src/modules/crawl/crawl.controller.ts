import { Controller, Post, Body } from '@nestjs/common';
import { CrawlService } from './crawl.service';
import { CrawlBooksDto } from './dto/crawl-request.dto';

@Controller('crawl')
export class CrawlController {
  constructor(private readonly crawlService: CrawlService) {}

  /**
   * 도서 정보 크롤링
   * POST /api/crawl/books
   */
  @Post('books')
  async crawlBooks(@Body() crawlBooksDto: CrawlBooksDto) {
    try {
      const data = await this.crawlService.crawlBooks(crawlBooksDto);
      return { message: 'success', data };
    } catch (error) {
      console.error('크롤링 중 오류 발생:', error);
      return { error: 'Crawling failed' };
    }
  }

  /**
   * 크롤링된 도서 데이터 정제
   * POST /api/crawl/refine
   */
  @Post('refine')
  async refineBookData(@Body() books: any[]) {
    try {
      const data = await this.crawlService.refineBookData(books);
      return { message: 'success', data };
    } catch (error) {
      console.error('데이터 정제 중 오류 발생:', error);
      return { error: 'Data refinement failed' };
    }
  }
}