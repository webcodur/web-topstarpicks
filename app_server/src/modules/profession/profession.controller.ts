import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  ParseIntPipe 
} from '@nestjs/common';
import { ProfessionService } from './profession.service';
import { CreateProfessionDto } from './dto/create-profession.dto';
import { UpdateProfessionDto } from './dto/update-profession.dto';

@Controller('profession')
export class ProfessionController {
  constructor(private readonly professionService: ProfessionService) {}

  /**
   * 모든 직군 조회
   * GET /api/profession
   */
  @Get()
  async findAll() {
    try {
      const data = await this.professionService.findAll();
      return { message: 'success', data };
    } catch (error) {
      console.error('Profession query error:', error);
      return { message: 'error', error: error.message };
    }
  }

  /**
   * 새 직군 추가
   * POST /api/profession
   */
  @Post()
  async create(@Body() createProfessionDto: CreateProfessionDto) {
    const result = await this.professionService.create(createProfessionDto);
    return { message: 'success', data: { id: result.lastID } };
  }

  /**
   * 직군 정보 수정
   * PUT /api/profession/:id
   */
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfessionDto: UpdateProfessionDto
  ) {
    const result = await this.professionService.update(id, updateProfessionDto);
    return { message: 'success', data: { changes: result.changes } };
  }

  /**
   * 직군 삭제
   * DELETE /api/profession/:id
   */
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.professionService.remove(id);
    return { message: 'success', data: { changes: result.changes } };
  }
}