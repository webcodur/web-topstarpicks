import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@shared/database/database.service';
import { CreateProfessionDto } from './dto/create-profession.dto';
import { UpdateProfessionDto } from './dto/update-profession.dto';

@Injectable()
export class ProfessionService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    const sql = this.databaseService.sql`
      SELECT id, name, eng_name
      FROM profession
      ORDER BY name
    `;
    return await this.databaseService.executeQuery(sql);
  }

  async create(createProfessionDto: CreateProfessionDto) {
    const { name, eng_name } = createProfessionDto;
    const sql = this.databaseService.sql`
      INSERT INTO profession (name, eng_name)
      VALUES (${name}, ${eng_name})
    `;
    return await this.databaseService.executeRun(sql);
  }

  async update(id: number, updateProfessionDto: UpdateProfessionDto) {
    const { name, eng_name } = updateProfessionDto;
    const sql = this.databaseService.sql`
      UPDATE profession
      SET name = ${name},
          eng_name = ${eng_name}
      WHERE id = ${id}
    `;
    return await this.databaseService.executeRun(sql);
  }

  async remove(id: number) {
    const sql = this.databaseService.sql`DELETE FROM profession WHERE id = ${id}`;
    return await this.databaseService.executeRun(sql);
  }
}