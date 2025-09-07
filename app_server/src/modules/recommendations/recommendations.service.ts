import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@shared/database/database.service';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { UpdateRecommendationDto } from './dto/update-recommendation.dto';
import { RecommendationQueryDto } from './dto/recommendation-query.dto';

@Injectable()
export class RecommendationsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findByCelebrityAndContent(queryParams: RecommendationQueryDto) {
    const { celebrity_name, content_name } = queryParams;

    const sql = this.databaseService.sql`
      SELECT 
        r.title, r.creator, r.release_date, r.recommendation_text as reason, 
        r.affiliate_link, r.img_link, r.mediaDescription, r.recommendation_source
      FROM 
        recommendations r
      JOIN 
        celebrities c ON r.celebrity_id = c.id
      JOIN 
        content con ON r.content_id = con.id
      WHERE 
        c.name = ${celebrity_name}
        AND con.name = ${content_name}
      ORDER BY 
        r.release_date DESC
    `;

    return await this.databaseService.executeQuery(sql);
  }

  async findAll() {
    const sql = this.databaseService.sql`
      SELECT r.*, c.name as celebrity_name, con.name as content_name
      FROM recommendations r
      JOIN celebrities c ON r.celebrity_id = c.id
      JOIN content con ON r.content_id = con.id
      ORDER BY r.id
    `;

    return await this.databaseService.executeQuery(sql);
  }

  async create(createRecommendationDto: CreateRecommendationDto) {
    const {
      celebrity_id, content_id, title, creator, release_date,
      recommendation_text, recommendation_source, img_link,
      affiliate_link, mediaDescription
    } = createRecommendationDto;

    const sql = this.databaseService.sql`
      INSERT INTO recommendations (
        celebrity_id, content_id, title, creator, release_date, 
        recommendation_text, recommendation_source, img_link, 
        affiliate_link, mediaDescription
      )
      VALUES (
        ${celebrity_id}, ${content_id}, ${title}, ${creator}, ${release_date}, 
        ${recommendation_text}, ${recommendation_source}, ${img_link}, 
        ${affiliate_link}, ${mediaDescription}
      )
    `;

    return await this.databaseService.executeRun(sql);
  }

  async update(id: number, updateRecommendationDto: UpdateRecommendationDto) {
    const {
      celebrity_id, content_id, title, creator, release_date,
      recommendation_text, recommendation_source, img_link,
      affiliate_link, mediaDescription
    } = updateRecommendationDto;

    const sql = this.databaseService.sql`
      UPDATE recommendations 
      SET celebrity_id = ${celebrity_id},
          content_id = ${content_id},
          title = ${title},
          creator = ${creator},
          release_date = ${release_date},
          recommendation_text = ${recommendation_text},
          recommendation_source = ${recommendation_source},
          img_link = ${img_link},
          affiliate_link = ${affiliate_link},
          mediaDescription = ${mediaDescription}
      WHERE id = ${id}
    `;

    return await this.databaseService.executeRun(sql);
  }

  async remove(id: number) {
    const sql = this.databaseService.sql`DELETE FROM recommendations WHERE id = ${id}`;
    return await this.databaseService.executeRun(sql);
  }
}