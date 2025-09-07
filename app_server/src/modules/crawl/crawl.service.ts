import { Injectable } from '@nestjs/common';
import { CrawlBooksDto } from './dto/crawl-request.dto';

@Injectable()
export class CrawlService {
  constructor() {}

  /**
   * 텍스트 속성들을 정리하는 함수
   */
  private trimProperties(books: any[]) {
    return books.map(({ img_link, recommendation_source, ...rest }) => {
      const trimmedRest = Object.fromEntries(
        Object.entries(rest).map(([key, value]) => [key.trim(), value])
      );
      return trimmedRest;
    });
  }

  /**
   * 추천 텍스트에서 따옴표 내용만 추출
   */
  private reduceQuotes(books: any[]) {
    return books.map((book) => {
      const text = book.recommendation_text;

      // 텍스트가 없을 경우 빈 문자열 처리
      if (!text) {
        return {
          ...book,
          recommendation_text: '',
        };
      }

      const head = text.indexOf('"') + 1;
      const tail = text.lastIndexOf('"');

      if (head > 0 && tail > head) {
        return {
          ...book,
          recommendation_text: text.substring(head, tail),
        };
      } else {
        return {
          ...book,
          recommendation_text: text,
        };
      }
    });
  }

  async crawlBooks(crawlBooksDto: CrawlBooksDto) {
    // TODO: Implement actual web scraping logic
    // const { celebrity_name } = crawlBooksDto;
    
    // Placeholder implementation
    return {
      message: 'Crawling service not yet implemented',
      data: []
    };
  }

  async refineBookData(books: any[]) {
    // TODO: Implement book data refinement logic
    const trimmedBooks = this.trimProperties(books);
    const refinedBooks = this.reduceQuotes(trimmedBooks);
    
    return {
      message: 'Book data refined',
      data: refinedBooks
    };
  }
}