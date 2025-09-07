import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@shared/database/database.service';

@Injectable()
export class ContentService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    const sql = this.databaseService.sql`SELECT * FROM content`;
    return await this.databaseService.executeQuery(sql);
  }
}