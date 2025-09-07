import { Controller, Get, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';
import { ChatRequestDto } from './dto/chat-request.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  /**
   * OpenAI API 모델 확인
   * GET /api/ai
   */
  @Get()
  async getAvailableModels() {
    try {
      const data = await this.aiService.getAvailableModels();
      return { message: 'success', data };
    } catch (error) {
      console.error('API 체크 중 오류 발생:', error);
      return { error: 'Internal Server Error' };
    }
  }

  /**
   * OpenAI API 채팅 테스트
   * POST /api/ai/chat
   */
  @Post('chat')
  async chatTest(@Body() chatRequestDto: ChatRequestDto) {
    try {
      const data = await this.aiService.chatCompletion(chatRequestDto);
      return { message: 'success', data };
    } catch (error) {
      console.error('채팅 테스트 중 오류 발생:', error);
      return { error: 'Internal Server Error' };
    }
  }
}