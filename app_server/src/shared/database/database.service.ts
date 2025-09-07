import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sqlite3 from 'sqlite3';
import { SQL } from 'sql-template-strings';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);
  private db: sqlite3.Database;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const dbPath = this.configService.get<string>('DATABASE_PATH', 'topstarpicks.db');
    
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        this.logger.error('데이터베이스 연결 오류:', err.message);
        throw err;
      } else {
        this.logger.log(`'${dbPath}' 데이터베이스에 연결됨.`);
        
        // 데이터베이스 버전 확인
        this.db.get('PRAGMA user_version', (err, row: any) => {
          if (err) {
            this.logger.error('데이터베이스 버전 확인 오류:', err.message);
          } else {
            this.logger.log('데이터베이스 사용자 버전:', row.user_version);
          }
        });
      }
    });
  }

  /**
   * SQL 쿼리 실행 (모든 행 반환)
   */
  executeQuery<T = any>(sql: { text: string; values?: any[] } | string, values?: any[]): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const query = typeof sql === 'string' ? { text: sql, values: values || [] } : sql;
      
      this.db.all(query.text, query.values || [], (err, rows) => {
        if (err) {
          this.logger.error('쿼리 실행 오류:', err.message);
          this.logger.debug('Query:', query.text);
          this.logger.debug('Values:', query.values);
          reject(err);
        } else {
          resolve(rows as T[]);
        }
      });
    });
  }

  /**
   * SQL 쿼리 실행 (단일 행 반환)
   */
  executeQuerySingle<T = any>(sql: { text: string; values?: any[] } | string, values?: any[]): Promise<T | null> {
    return new Promise((resolve, reject) => {
      const query = typeof sql === 'string' ? { text: sql, values: values || [] } : sql;
      
      this.db.get(query.text, query.values || [], (err, row) => {
        if (err) {
          this.logger.error('쿼리 실행 오류:', err.message);
          this.logger.debug('Query:', query.text);
          this.logger.debug('Values:', query.values);
          reject(err);
        } else {
          resolve(row as T || null);
        }
      });
    });
  }

  /**
   * SQL 쿼리 실행 (INSERT/UPDATE/DELETE)
   */
  executeRun(sql: { text: string; values?: any[] } | string, values?: any[]): Promise<{ lastID: number; changes: number }> {
    return new Promise((resolve, reject) => {
      const query = typeof sql === 'string' ? { text: sql, values: values || [] } : sql;
      
      this.db.run(query.text, query.values || [], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ lastID: this.lastID, changes: this.changes });
        }
      });
    });
  }

  /**
   * SQL Template Strings 지원
   */
  sql(template: TemplateStringsArray, ...values: any[]) {
    return SQL(template, ...values);
  }

  /**
   * 데이터베이스 연결 반환 (직접 접근이 필요한 경우)
   */
  getDatabase(): sqlite3.Database {
    return this.db;
  }

  /**
   * 연결 종료
   */
  async close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          this.logger.error('데이터베이스 연결 종료 오류:', err.message);
          reject(err);
        } else {
          this.logger.log('데이터베이스 연결이 종료되었습니다.');
          resolve();
        }
      });
    });
  }
}