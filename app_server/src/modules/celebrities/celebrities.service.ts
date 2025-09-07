import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@shared/database/database.service';
import { CreateCelebrityDto } from './dto/create-celebrity.dto';
import { UpdateCelebrityDto } from './dto/update-celebrity.dto';
import { CelebrityQueryDto } from './dto/celebrity-query.dto';

@Injectable()
export class CelebritiesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findByName(name: string) {
    const sql = this.databaseService.sql`
      SELECT 
        cel.id, cel.name, cel.postname, cel.prename,
        pro.name as profession, cel.gender, cel.nationality, 
        cel.birth_date, cel.death_date, cel.biography, 
        cel.img_link, cel.vid_link, cel.is_real, cel.is_legend,
        GROUP_CONCAT(DISTINCT con.name) AS recommended_content_names
      FROM celebrities cel
      LEFT JOIN recommendations rec ON rec.celebrity_id = cel.id
      LEFT JOIN profession pro ON pro.id = cel.profession_id
      LEFT JOIN content con ON rec.content_id = con.id
      WHERE cel.name = ${name}
      GROUP BY cel.id
    `;

    return await this.databaseService.executeQuery(sql);
  }

  async findAll(queryParams: CelebrityQueryDto) {
    const { profession, era, menuType, contentName } = queryParams;

    let sql = this.databaseService.sql`
      SELECT 
        cel.id, cel.name, cel.prename, cel.postname,
        cel.gender, cel.nationality, cel.birth_date, cel.death_date, 
        cel.biography, cel.img_link, cel.vid_link, pro.name as profession,
        cel.is_real, cel.is_legend,
        GROUP_CONCAT(DISTINCT con.name) AS recommended_content_names,
        inf.political, inf.strategic, inf.tech, inf.social,
        inf.economic, inf.cultural, inf.transhistoricity,
        inf.total_score, inf.political_exp, inf.strategic_exp,
        inf.tech_exp, inf.social_exp, inf.economic_exp,
        inf.cultural_exp, inf.transhistoricity_exp, inf.rank
      FROM celebrities cel
      LEFT JOIN recommendations rec ON cel.id = rec.celebrity_id
      LEFT JOIN content con ON rec.content_id = con.id
      LEFT JOIN profession pro ON pro.id = cel.profession_id
      LEFT JOIN celebrity_influence inf ON cel.id = inf.celebrity_id
      WHERE 1=1
    `;

    // 직업 필터링
    if (profession && profession !== 'all') {
      sql = sql.append(this.databaseService.sql` AND pro.name = ${profession}`);
    }

    // 시대 구분 필터링
    const CURRENT_YEAR = new Date().getFullYear();
    if (era === '역사인물') {
      sql = sql.append(this.databaseService.sql`
        AND (
          cel.birth_date LIKE '-_%'
          OR cel.death_date LIKE '-_%'
          OR (
            cel.birth_date IS NOT NULL 
            AND cel.birth_date != ''
            AND NOT cel.birth_date LIKE '-_%'
            AND CAST(SUBSTR(cel.birth_date, 1, 4) AS INTEGER) <= ${CURRENT_YEAR - 100}
          )
          OR (
            cel.death_date IS NOT NULL 
            AND cel.death_date != ''
            AND NOT cel.death_date LIKE '-_%'
            AND CAST(SUBSTR(cel.death_date, 1, 4) AS INTEGER) <= ${CURRENT_YEAR - 30}
          )
        )
      `);
    } else if (era === '현대인물') {
      sql = sql.append(this.databaseService.sql`
        AND NOT (
          cel.birth_date LIKE '-_%'
          OR cel.death_date LIKE '-_%'
        )
        AND (
          (
            cel.birth_date IS NOT NULL 
            AND cel.birth_date != ''
            AND CAST(SUBSTR(cel.birth_date, 1, 4) AS INTEGER) > ${CURRENT_YEAR - 100}
          )
          OR (
            cel.death_date IS NOT NULL 
            AND cel.death_date != ''
            AND CAST(SUBSTR(cel.death_date, 1, 4) AS INTEGER) > ${CURRENT_YEAR - 30}
          )
        )
      `);
    }

    // 메뉴 타입 필터링
    if (menuType === '인물도감') {
      sql = sql.append(this.databaseService.sql` AND cel.is_real = 1`);
    } else if (menuType === '전설도감') {
      sql = sql.append(this.databaseService.sql` AND cel.is_legend = 1`);
    } else if (menuType === '추천정보' && contentName) {
      sql = sql.append(this.databaseService.sql` AND con.name = ${contentName}`);
    }

    // 결과 정렬
    sql = sql.append(this.databaseService.sql`
      GROUP BY cel.id
      ORDER BY cel.name
    `);

    return await this.databaseService.executeQuery(sql);
  }

  async getProfessionNumbers() {
    const sql = this.databaseService.sql`
      SELECT 
        pro.id, pro.name, pro.eng_name, COUNT(*) AS profession_count
      FROM celebrities cel    
      LEFT JOIN profession pro ON pro.id = cel.profession_id
      GROUP BY pro.id    
      ORDER BY pro.name
    `;

    return await this.databaseService.executeQuery(sql);
  }

  async findAllForAdmin() {
    const sql = this.databaseService.sql`
      SELECT 
        cel.id, 
        cel.name as name, 
        cel.prename, 
        cel.postname, 
        cel.gender,
        cel.nationality,
        cel.birth_date,
        cel.biography,
        cel.img_link,
        cel.vid_link,
        cel.death_date,
        pro.id as profession_id,
        pro.name as profession_kor,
        pro.eng_name as profession_eng
      FROM celebrities cel
      INNER JOIN profession pro ON pro.id = cel.profession_id
    `;

    return await this.databaseService.executeQuery(sql);
  }

  async create(createCelebrityDto: CreateCelebrityDto) {
    const {
      name, prename, postname, profession_id, gender, nationality,
      birth_date, death_date, biography, img_link, vid_link,
      book_story, quotes, is_real, is_legend
    } = createCelebrityDto;

    const sql = this.databaseService.sql`
      INSERT INTO celebrities (
        name, prename, postname, profession_id, gender, nationality, 
        birth_date, death_date, biography, img_link, vid_link,
        book_story, quotes, is_real, is_legend
      )
      VALUES (
        ${name}, ${prename || ''}, ${postname || ''}, ${profession_id}, 
        ${gender || ''}, ${nationality || ''}, ${birth_date || ''}, 
        ${death_date || ''}, ${biography || ''}, ${img_link || ''}, 
        ${vid_link || ''}, ${book_story || ''}, ${quotes || ''}, 
        ${is_real || 0}, ${is_legend || 0}
      )
    `;

    return await this.databaseService.executeRun(sql);
  }

  async update(id: number, updateCelebrityDto: UpdateCelebrityDto) {
    const {
      name, prename, postname, profession_id, gender, nationality,
      birth_date, death_date, biography, img_link,
      book_story, quotes, is_real, is_legend
    } = updateCelebrityDto;

    const sql = this.databaseService.sql`
      UPDATE celebrities 
      SET name = ${name}, 
          prename = ${prename}, 
          postname = ${postname}, 
          profession_id = ${profession_id}, 
          gender = ${gender}, 
          nationality = ${nationality}, 
          birth_date = ${birth_date}, 
          death_date = ${death_date}, 
          biography = ${biography}, 
          img_link = ${img_link},
          book_story = ${book_story},
          quotes = ${quotes},
          is_real = ${is_real},
          is_legend = ${is_legend}
      WHERE id = ${id}
    `;

    return await this.databaseService.executeRun(sql);
  }

  async remove(id: number) {
    const sql = this.databaseService.sql`DELETE FROM celebrities WHERE id = ${id}`;
    return await this.databaseService.executeRun(sql);
  }

  async search(query: string) {
    const sql = this.databaseService.sql`
      SELECT 
        cel.id, 
        cel.name,
        cel.prename,
        cel.postname,
        pro.name as profession_kor
      FROM celebrities cel
      LEFT JOIN profession pro ON pro.id = cel.profession_id
      WHERE cel.name LIKE ${`%${query}%`}
      OR cel.prename LIKE ${`%${query}%`}
      OR cel.postname LIKE ${`%${query}%`}
      ORDER BY cel.name
      LIMIT 10
    `;

    return await this.databaseService.executeQuery(sql);
  }

  async findById(id: number) {
    const sql = this.databaseService.sql`
      SELECT 
        cel.id, cel.name, cel.postname, cel.prename,
        pro.name as profession, cel.gender, cel.nationality, 
        cel.birth_date, cel.death_date, cel.biography, 
        cel.img_link, cel.vid_link, cel.book_story, cel.quotes,
        cel.is_real, cel.is_legend,
        pro.id as profession_id
      FROM 
        celebrities cel
      LEFT JOIN 
        profession pro ON pro.id = cel.profession_id
      WHERE 
        cel.id = ${id}
    `;

    const result = await this.databaseService.executeQuery(sql);
    return result.length > 0 ? result[0] : null;
  }

  async getInfluenceIndex(testName: string) {
    const sql = this.databaseService.sql`
      SELECT 
        cel.id, cel.name,
        inf.political, inf.strategic, inf.tech, inf.social,
        inf.economic, inf.cultural, inf.transhistoricity,
        inf.total_score, inf.political_exp, inf.strategic_exp,
        inf.tech_exp, inf.social_exp, inf.economic_exp,
        inf.cultural_exp, inf.transhistoricity_exp, inf.rank
      FROM celebrities cel
      JOIN celebrity_influence inf ON cel.id = inf.celebrity_id
      WHERE cel.name = ${testName}
    `;

    const result = await this.databaseService.executeQuery(sql);
    return result.length > 0 ? result[0] : null;
  }
}